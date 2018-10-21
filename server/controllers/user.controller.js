var User = require('../models/user.model');
var path = require('path');
var crypto = require('crypto');
var secret = 'harrypotter';
var mail = require('../utils/mail');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
module.exports = {
    updateUser:updateUser,
    createUser: createUser,
    getUsers: getUsers,
    uploadAvatar: uploadAvatar,
    getInforUser: getInforUser,
    changePassword: changePassword,
    forgetPassword: forgetPassword,
    UpdateUserByAdmin:UpdateUserByAdmin,
    deleteUser:deleteUser
}
function deleteUser(id){
    return User.findByIdAndRemove(id)
        .then((res)=>{
            return Promise.resolve(res);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
function UpdateUserByAdmin(body){
    return User.findByIdAndUpdate(body._id,body)
        .then((res)=>{
            return Promise.resolve(res);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
function updateUser(id,body){
    return User.findByIdAndUpdate(id,body)
        .then((user)=>{
            user.location = body.location;
            return Promise.resolve(user);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
function forgetPassword(email) {
    return User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return Promise.resolve({ message: ErrorUser.ERROR_NOTFOUND, statusCode: Status.NOT_FOUND })
            } else {
                let passwordRamdom = '';
                for (let i = 0; i < 6; i++) {
                    let number = Math.floor(Math.random() * 9) + 1;
                    passwordRamdom = passwordRamdom + number.toString();
                }
                var hash = crypto.createHmac('sha256', secret)
                    .update(passwordRamdom)
                    .digest('hex');     
                User.findByIdAndUpdate(user._id, { password: hash })
                    .then((res) => {
                        return mail.sendMail('', user.email, 'new password', '<h1>Password is '+ passwordRamdom+ ' </h1>')
                            .then( (res) =>{
                                return Promise.resolve(res);
                            })
                            .catch( (err)=> {
                                return Promise.reject(err);
                            })
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    })


            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
function changePassword(id, body) {
    return User.findById(id)
        .then((user) => {
            if (!user) {
                return Promise.resolve({ message: ErrorUser.ERROR_NOTFOUND, statusCode: Status.NOT_FOUND })
            } else {
                var hash = crypto.createHmac('sha256', secret)
                    .update(body.password_old)
                    .digest('hex');
                if (hash != user.password) {
                    return Promise.reject({ message: ErrorUser.PASSWORD_WRONG, statusCode: Status.BAD_REQUEST })
                } else {
                    var newPass = crypto.createHmac('sha256', secret)
                        .update(body.new_password)
                        .digest('hex');
                    User.findByIdAndUpdate(user._id, { password: newPass })
                        .then(() => {
                            return Promise.resolve(res);
                        })
                }
            }
        })
}
function getInforUser(id) {
    return User.findById(id, { password: 0, _v: 0 })
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
function uploadAvatar(id, file) {
    return User.findOne({ _id: id })
        .then((user) => {
            if (!user) {
                return Promise.reject({ message: errorUser.ERROR_NOTFOUND, statusCode: Status.NOT_FOUND })
            } else {
                return new Promise((resolve, reject) => {
                    var avatar = 'avatar_' + user._id + '.png';
                    file.mv(path.join(__dirname, '../public/avatar/' + avatar), (err) => {
                        if (err) {
                            return reject(err);
                        }
                        return User.update({ _id: user._id }, { $set: { avatar: avatar } })
                            .then((res) => {
                                return resolve(res);
                            })
                            .catch((err) => {
                                return reject(err);
                            })
                    })
                })
            }

        })
        .catch((err) => {
            return Promise.reject(err)
        })
}
function getUsers() {
    return User.find()
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(err => {
            return Promise.reject(err);
        })
}
function createUser(newUser) {
    return User.find({ email: newUser.email })
        .then(function (foundUsers) {
            if (foundUsers.length > 0) {
                return Promise.reject({
                    statusCode: Status.NOT_FOUND,
                    message: ErrorUser.ERROR_MAIL_EXIST
                });
            } else {
                var hash = crypto.createHmac('sha256', secret)
                    .update(newUser.password)
                    .digest('hex');
                newUser.password = hash;
                var user = new User(newUser);
                return user.save()
                    .then(function (user) {
                        return mail.sendMail('', user.email, 'New user registration', '<h1>Chào mừng bạn đã sử dụng dịch vụ của chúng tôi</h1>')
                            .then(function (res) {
                                return Promise.resolve(res);
                            })
                            .catch(function (err) {
                                return Promise.reject(err);
                            })
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    })
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}