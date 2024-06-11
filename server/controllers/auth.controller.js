const UserModel = require('../models/user.model');
const SchoolModel = require('../models/school.model.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token.model.js');
const VerifyEmail = require('../templates/verfiy-email.js');
const { sendMail } = require('../helpers/mail.helper.js')

const login = async (req, res) => {
    try {
        let body = req.body;
        let user = await UserModel.findOne({ email: body.email });
        if (!user) {
            return res.send({ status: 203, message: 'No Such user exists!' });
        }
        if (!user.isActive) {
            return res.send({ status: 203, message: 'User not Active!' });
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

const schoolSignup = async (req, res) => {
    try {
        let body = req.body;

        let userWithMail = await UserModel.findOne({ email: body.email });
        if (userWithMail) {
            return res.send({ status: 202, message: 'Email Already Exists!' })
        }

        let userObj = {
            email: body.email,
            role: 'admin',
            phone: body.phone,
        }
        let admin = await UserModel(userObj).save();
        body['head'] = admin._id;

        let schoolCreated = await SchoolModel(body).save();
        await UserModel.updateOne({ _id: admin._id }, { $set: { school: schoolCreated._id } });

        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3)

        let token = await generateHashedToken();

        let tokenObj = {
            userId: admin._id,
            expiryDate, token
        }
        await TokenModel(tokenObj).save();
        let link = process.env.CLIENT_URL + '/verify-school?token=' + token;
        const template = VerifyEmail({ email: body.email, link });
        await sendMail(body.email, 'Activate your Account', template, 'Activate your Account')
        console.log('LNK to VERIFY SCHOOL IS HERE>>>>>', link)
        res.send({ status: 200, message: 'School Registered Successfully!' });
    } catch (error) {
        console.log('schoolSignup', error)

    }
}

const verifySchool = async (req, res) => {
    try {
        if (!req.body.token)
            return res.send({ status: 202, message: 'No Token Found!' });
        let token = await TokenModel.findOne({ token: req.body.token });
        if (!token)
            return res.status(405).send({ message: 'No token Found!' })

        if (isSmallerThanTheCurrentDate(token.expiryDate))
            return res.status(406).send({ message: 'Token Expired!' });

        let admin = await UserModel.findOne({ _id: token.userId }, { password: 0 });
        let school = await SchoolModel.findOne({ head: token.userId });

        res.status(200).send({ admin, school, message: 'Token Verified!' })
    } catch (err) {
        console.log('verifySchool', err)
    }
}

const completeSchoolSignup = async (req, res) => {
    try {
        let { name, fname, lname, phone, email, level, address, school, head, modeOfEducation, tab, password } = req.body;
        if (tab === 'school') {
            await SchoolModel.updateOne({ _id: school }, {
                $set: {
                    name, address, email, phone, level,
                    modeOfEducation
                }
            });
        } else if (tab === 'admin') {
            await UserModel.updateOne({ _id: head }, {
                $set: {
                    fname, lname, phone, email
                }
            });
        } else {
            let pass = await bcrypt.hash(password, saltRounds);
            await UserModel.updateOne({ _id: head }, {
                $set: {
                    password: pass,
                    isActive: true
                }
            });
            const token = await jwt.sign({ id: head, password: pass }, process.env.SECRET_KEY);
            return res.send({ user: { token, userId: head }, status: 200, message: 'Signup Successfully' })
        }
        res.status(200).send({ message: 'Update Successfully!' })

    } catch (err) {
        console.log('completeSchoolSignup', err)
    }
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function generateHashedToken() {
    const tokenLength = 32;
    const randomString = generateRandomString(tokenLength);
    const saltRounds = 10; // Adjust the salt rounds as needed

    try {
        const hashedToken = await bcrypt.hash(randomString, saltRounds);
        return hashedToken;
    } catch (err) {
        console.error('Error hashing token:', err);
        throw err;
    }
}


function isSmallerThanTheCurrentDate(dateString) {
    let currentDate = new Date();
    let givenDate = new Date(dateString);
    return givenDate < currentDate;
}


module.exports = {
    login,
    signup,
    schoolSignup,
    verifySchool,
    completeSchoolSignup
}