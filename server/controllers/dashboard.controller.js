const StudentModel = require('../models/student.model.js');
const TeachersModel = require('../models/teacher.model.js');
const UserModel = require('../models/user.model.js')
const SchoolModel = require('../models/school.model.js')


const getDashboardStats = async (req, res) => {
    try {
        console.log('getDashboardStats route-----', req.user);
        const studentsCount = await StudentModel.countDocuments({ school: req.user.school });
        const teachersCount = await TeachersModel.countDocuments({ school: req.user.school, isPrincipal: false });
        const otherStaffCount = await TeachersModel.countDocuments({ school: req.user.school, isPrincipal: true });
        const others = await UserModel.countDocuments({ school: req.user.school, role: 'admin' });
        let info = {
            count: {
                teachers: teachersCount,
                students: studentsCount,
                otherStaff: otherStaffCount,
                others: others
            }
        }
        return res.send(info);
    } catch (err) {
        console.log('getDashboardStats', err)
    }
}

module.exports = {
    getDashboardStats
}