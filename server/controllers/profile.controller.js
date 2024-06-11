const UserModel = require('../models/user.model');
const TeacherModel = require('../models/teacher.model.js');
const StudentModel = require('../models/student.model.js');
const ParentModel = require('../models/parent.model.js');
const fs = require('fs');
const path = require('path');
const { uploadImage, deleteImage, getPublicKeyFromUrl } = require('../helpers/cloudinary.helper.js')

const profileInfo = async (req, res) => {
    try {
        let id = req.params.id
        let usrInfo = await UserModel.findOne({ _id: id }, { password: 0, isActive: 0 }).lean();
        if (!usrInfo) return res.status(500).send({ message: 'Something went wrong!!' });
        let otherInfo;
        if (usrInfo.role === 'student') {
            otherInfo = await StudentModel.findOne({ userId: id }).lean();
        } else if (usrInfo.role === 'teacher') {
            otherInfo = await TeacherModel.findOne({ userId: id }).lean();
        } else if (usrInfo.role === 'parent') {
            otherInfo = await ParentModel.findOne({ userId: id }).lean();
        }
        usrInfo['otherInfo'] = otherInfo

        return res.status(200).send({ info: usrInfo })
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
        return res.send({ status: 200, message: 'Profile Updated Successfully!' })
    } catch (error) {
        console.log('updateProfileInfo', error)
    }
}

const uploadProfile = async (req, res) => {
    try {
        let id = req.params.id;
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const filePath = path.join(__dirname, '../uploads', req.file.filename);

        let userData = await UserModel.findOne({ _id: id }, { profilePic: 1 });
        if (userData.profilePic) {
            let path = getPublicKeyFromUrl(userData.profilePic);
            await deleteImage(path)
        }
        let profilePic = await uploadImage(filePath, 'profile_image_' + id)
        await UserModel.updateOne({ _id: id }, { $set: { profilePic } })

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete local file: ${filePath}`, err);
            } else {
                console.log(`Successfully deleted local file: ${filePath}`);
            }
        });

        res.status(200).json({
            message: 'File uploaded successfully',
            src: profilePic
        });
    } catch (err) {
        console.log(err)
    }
}


const deleteProfilePic = async (req, res) => {
    try {
        let id = req.params.id;
        let userData = await UserModel.findOne({ _id: id }, { profilePic: 1 });
        let path = getPublicKeyFromUrl(userData.profilePic);
        await deleteImage(path)
        await UserModel.updateOne({ _id: id }, { $set: { profilePic: null } })
        res.status(200).json({
            message: 'File removed successfully',
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    profileInfo,
    updateProfileInfo,
    uploadProfile,
    deleteProfilePic
}