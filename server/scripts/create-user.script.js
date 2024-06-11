require('dotenv').config()
require('../configs/db.config.js');
const UserModel = require('../models/user.model.js');
const userData = require('../fake-data/user.json');
const schoolData = require('../fake-data/school.json')
const TeacherModel = require('../models/teacher.model.js');
const StudentModel = require('../models/student.model.js');
const SchoolModel = require('../models/school.model.js')

const script = async () => {
    try {
        for (let user of userData) {
            let school = await SchoolModel.findOne({});
            if (user.role === 'admin') {
                let schoolInfo = schoolData.find(sch => sch.email === user.email);
                school = await SchoolModel(schoolInfo).save();
            }
            if (user.role === 'principal')
                user['isPrincipal'] = true;

            user['school'] = school._id;
            let userInfo = await UserModel(user).save();
            user['userId'] = userInfo._id;

            if (user.role === 'principal') {
                user['isPrincipal'] = true;
                await TeacherModel(user).save();
            } else if (user.role === 'teacher') {
                await TeacherModel(user).save();
            } else if (user.role === 'student') {
                await StudentModel(user).save();
            }
        }
        console.log('Done')
    } catch (err) {
        console.log(err)
    }
}

script()