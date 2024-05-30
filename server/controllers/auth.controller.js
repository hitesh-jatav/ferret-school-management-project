const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        let body = req.body;
        let user = await UserModel.findOne({ email: body.email });
        if (!user) {
            return res.send({ status: 203, message: 'No Such user exists!' });
        }
        let isPass = await bcrypt.compare(body.pass, user?.password)
        if (!isPass) {
            return res.send({ status: 203, message: 'Incorrect Password' });
        }
        const token = await jwt.sign({ id: user._id, password: user?.password }, process.env.SECRET_KEY);

        return res.send({ user: { token, userId: user._id }, status: 200, message: 'Login Successfully' })
    } catch (err) {
        console.log('login', err)
    }
}

const signup = async (req, res) => {
    try {
        let body = req.body;
        let userExist = await UserModel.findOne({ email: body.email });
        if (userExist) {
            return res.send({ status: 200, message: 'Email Already Exists!' })
        }
        body['password'] = await bcrypt.hash(body.password, saltRounds);
        await UserModel(body).save()
        res.send({ status: 200, message: 'Successfull' });
    } catch (error) {
        console.log('signup', error)
    }
}


const verifyUser = async (req, res) => {
    try {
        res.send({ status: 200, message: 'User is verified' })
    } catch (err) {
        console.log('verify-user,', err)
    }
}

module.exports = {
    login, signup, verifyUser
}