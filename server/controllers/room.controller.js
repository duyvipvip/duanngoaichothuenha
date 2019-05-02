var History = require('../models/history.model');
var Room = require('../models/room.model');
var thanhtoan = require('../models/thanhtoan.model');
var rentHouse = require('../models/rentHouse.model');
var path = require('path');
const uuid = require('uuid');
var fs = require("fs");
var paramater = require('../constants/paramater');
module.exports = {
    deleteImageRoom: deleteImageRoom,
    createRoom: createRoom,
    deleteRoom: deleteRoom,
    updateImageRoom: updateImageRoom,
    getsRoom: getsRoom,
    updateRoom: updateRoom,
    updateRoomRate: updateRoomRate,
    getRoomByUser: getRoomByUser,
    getRoomById: getRoomById,
    Transaction: Transaction,
    changestatususer: changestatususer,
    laycacbaidangcuauser: laycacbaidangcuauser,
    laylichsuyeucauthuenha: laylichsuyeucauthuenha,
    laymangtoadolocation: laymangtoadolocation
}
function Transaction(id) {
    return Room.findByIdAndUpdate(id, { status_room: paramater.ROOM_FULL }, { new: true })
        .then((res) => {
            let history = new History({
                idUser: res.id_user,
                room: res._id
            })
            history.save();
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
function getRoomByUser(id) {
    return Room.find({ id_user: id })
        .populate("iduserRentHouse.iduser")
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].image.length; j++) {
                    data[i].image[j] = 'https://cuongpham.herokuapp.com/image/' + data[i].image[j];
                }
            }
            return Promise.resolve(data)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}
function deleteImageRoom(id, img) {
    return Room.findOne({ _id: id })
        .then((data) => {
            if (data) {
                return new Promise((resolve, reject) => {
                    data.image.forEach(element => {
                        if (element === img) {
                            fs.unlink(path.join(__dirname, '../public/image/' + element), (err) => {
                                if (err) {
                                    return reject(err);
                                }
                            })
                            Room.update(
                                { _id: id },
                                { $pull: { image: img } },
                                { multi: true }
                            )
                                .then((resulf) => {

                                    return resolve(resulf);
                                })
                                .catch((err) => {
                                    return reject(err);
                                })
                        }
                    })
                })

            } else {
                return Promise.reject({ message: "not found" })
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
function deleteRoom(id) {
    return Room.findOne({ _id: id })
        .then((room) => {
            if (room) {
                return Room.update({ "_id": id }, { $set: { "deleted": true } })
                    .then((room) => {
                        return resolve(room);
                    })
                    .catch((err) => {
                        return reject(err);
                    })
            } else {
                return Promise.reject({ message: "not found" })
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
function updateImageRoom(id, file) {

    return Room.findOne({ _id: id })
        .then((room) => {
            if (room) {
                return new Promise((resolve, reject) => {
                    var img = 'room_' + uuid.v4() + '.png';
                    room.image.push(img)
                    file.mv(path.join(__dirname, '../public/image/' + img), (err) => {
                        if (err) {
                            return reject(err);
                        }
                        return Room.update({ _id: id }, { $set: { image: room.image } })
                            .then((data) => {
                                return resolve(data);
                            })
                            .catch((err) => {
                                return reject(err);
                            })
                    });
                });
            } else {
                return Promise.reject({
                    message: "not Found"
                });
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

function updateRoomRate(id, data) {
    let idUser = data.idUser;
    let star = data.star;
    let rateUser = `rate.${idUser}`;
    let objRemove = {
        $pull: {
            rate: {
                idUser: idUser
            }
        }
    }
    let objInsert = {
        $push: {
            rate: {
                idUser: idUser,
                star: star
            }
        }
    }
    return Room.findByIdAndUpdate({ _id: id }, objRemove)
        .then((room) => {
            return Room.findByIdAndUpdate({ _id: id }, objInsert)
                .then((room1) => {
                    return Promise.resolve(room1);
                })
                .catch((err) => {
                    return Promise.reject(err);
                })
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

function updateRoom(id, data) {

    return Room.findByIdAndUpdate({ _id: id }, data)
        .then((room) => {

            return Promise.resolve(room);
        })
        .catch((err) => {

            return Promise.reject(err);
        })
}
function getsRoom(page) {
    let Page = parseInt(page.page);
    let Amount = parseInt(page.amount);
    let Type = parseInt(page.type);
    return Room.find({
        $and: [
            { deleted: false},
            { category: { $regex: page.loainha, $options: "$i" } },
            { title: { $regex: page.search, $options: "$i" } },
            { address: { $regex: page.tinh, $options: "$i" } },
            { price: { $gte: page.khoanggia }},
        ]

    })
        .sort({ [page.sort]: Type })
        .skip((Page * Amount) - Amount)
        .limit(Amount)
        .populate('id_user')
        .then((res) => {
            let result = [];
            res.forEach(element => {
                for (let i = 0; i < element.image.length; i++) {
                    element.image[i] = 'https://cuongpham.herokuapp.com/image/' + element.image[i];
                }
                result.push(element);
              
            });
            return Room.find()
                .then((data) => {
                    return {
                        Data: result,
                        Page: Page,
                        Amount: Amount,
                        TotalPage: (Math.floor(data.length / Amount) ? Math.floor(data.length / Amount) : 1) + (data.length % Amount ? 0 : 1),
                        Total: data.length,
                        SearchText: page.search
                    }
                })
        })
        .catch((err) => {
            return Promise.reject(err);
        })

}
function createRoom(data) {
    return data.save()
        .then((room) => {
            return Promise.resolve(room);
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}
function getRoomById(id) {
    return Room.findById(id)
        .populate('id_user', { password: 0, role: 0, address: 0, avatar: 0 })
        .then((room) => {
            for (let i = 0; i < room.image.length; i++) {
                if(room.image[i]){
                    room.image[i] = 'https://cuongpham.herokuapp.com/image/' + room.image[i];
                }
            }
            for (let i = 0; i < room.hinhanhgiayto.length; i++) {
                if(room.hinhanhgiayto[i]){
                    room.hinhanhgiayto[i] = 'https://cuongpham.herokuapp.com/image/' + room.hinhanhgiayto[i];
                }
               
            }
            return Promise.resolve(room);
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

function changestatususer(idhouse, iduser, status, idusercreate) {
    if (status == 1) {
        return Room.update({ "_id": idhouse, "iduserRentHouse.iduser": iduser }, { $set: { "iduserRentHouse.$.status": status, "deleted": true } })
            .then((room) => {
                let body = {
                    idhouse: idhouse,
                    iduser: idusercreate
                }
                // them vao thanh toan
                return thanhtoan.create(body)
                    .then(() => {
                        return Promise.resolve(room);
                    })
            })
            .catch((err) => {

            })
    } else {
        return Room.update({ "_id": idhouse, "iduserRentHouse.iduser": iduser }, { $set: { "iduserRentHouse.$.status": status, "deleted": false } })
            .then((room) => {
                return thanhtoan.findOneAndRemove({ idhouse: idhouse, iduser: iduser })
                    .then(() => {
                        return Promise.resolve(room);
                    })
            })
            .catch((err) => {

            })
    }

}

function laycacbaidangcuauser(iduser) {
    return Room.find({ "id_user": iduser })
        .populate('id_user')
        .then((data) => {
            let result = [];
            for (let i = 0; i < data.length; i++) {
                if (!data[i].deleted) {
                    result.push(data[i]);
                }
            }
            return Promise.resolve(result);
        })
}

function laylichsuyeucauthuenha(iduser) {
    return Room.find({ "iduserRentHouse.iduser": iduser })
        .then((data) => {
            return Promise.resolve(data);
        })
}

function laymangtoadolocation() {
    return Room.find()
        .then((data) => {
            let arrTemp = [];
            for (let i = 0; i < data.length; i++) {
                let object = {
                    lat: data[i].location.lat,
                    lng: data[i].location.lng,
                    label: data[i].address,
                    draggable: true
                }
                arrTemp.push(object);
            }
            return Promise.resolve(arrTemp);
        })

}
