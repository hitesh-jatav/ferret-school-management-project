const ParentModel = require('../models/parent.model.js');
const UserModel = require('../models/user.model.js');

const addParent = async (req, res) => {
    try {
        const { fname, lname, email, phone, gender, parent } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const newUser = new UserModel({
            fname, lname, email, parent,
            phone, role: 'parent', gender
        });

        await newUser.save();

        const newParent = new ParentModel({
            userId: newUser._id, fname, parent,
            lname, email, phone, gender
        });

        let newParentCreated = await newParent.save();

        return res.status(201).json({ message: 'Parent added successfully', parent: newParentCreated });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' });
    }
}

const getParent = async (req, res) => {
    try {
        let filter = {}
        if (req.query.word.trim()) {
            let word = req.query.word.trim().toLowerCase();
            filter = {
                $or: [
                    { fname: { $regex: new RegExp("^" + word, "i") } },
                    { lname: { $regex: new RegExp("^" + word, "i") } },
                    { email: { $regex: new RegExp("^" + word, "i") } },
                    { phone: { $regex: new RegExp("^" + word, "i") } },
                ]
            }
        }
        let parents = await ParentModel.find(filter);
        return res.status(200).json({ parents });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    addParent,
    getParent
}