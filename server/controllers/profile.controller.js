const UserModel = require('../models/user.model')

const profileInfo = async (req, res) => {
    try {
        let usrInfo = await UserModel.findOne({ _id: req.params.id }, { password: 0, isActive: 0 });
        if (!usrInfo) return res.send({ status: 400, message: 'Something went wrong!!' })
        return res.send({ status: 200, info: usrInfo })
    } catch (error) {
        console.log('profileInfo', error)
    }
}

const updateProfileInfo = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        delete body._id;

        await UserModel.updateOne({ _id: req.params.id }, { $set: body });
        console.log(id, body)
        return res.send({ status: 200, message: 'Profile Updated Successfully!' })
    } catch (error) {
        console.log('updateProfileInfo', error)
    }
}

module.exports = {
    profileInfo,
    updateProfileInfo
}