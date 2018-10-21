var History = require('../models/history.model');
var Room = require('../models/room.model');
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
    getRoomByUser:getRoomByUser,
    getRoomById:getRoomById,
    Transaction:Transaction
}
function Transaction(id){
    return Room.findByIdAndUpdate(id,{status_room:paramater.ROOM_FULL},{new:true})
        .then((res)=>{
            let history = new History({
                idUser:res.id_user,
                room:res._id
            })
            history.save();
            return Promise.resolve(res);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
function getRoomByUser(id){
   return Room.find({id_user:id})
        .then((data)=>{
           for(let i = 0;i<data.length;i++){
                for(let j = 0 ;j<data[i].image.length;j++){
                    data[i].image[j]= 'http://localhost:8088/image/'+ data[i].image[j];
                }
            }
            return Promise.resolve(data)
        })
        .catch((err)=>{
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
                return new Promise((resolve, reject) => {
                    room.image.forEach(element => {
                        fs.unlink(path.join(__dirname, '../public/image/' + element), (err) => {
                            if (err) {
                                return reject(err);
                            }
                        }
                        );
                        return Room.findByIdAndRemove({ _id: id })
                            .then(() => {
                                return resolve();
                            })
                            .catch((err) => {
                                return reject(err);
                            })
                    });
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
    let Page= parseInt(page.page);
    let Amount = parseInt(page.amount);
    let Type = parseInt(page.type);
    if (page.search == '') {
        return Room.find({status_room:paramater.ROOM_USE})
        .sort({ [page.sort]: Type})
        .skip((Page * Amount) - Amount)
        .limit(Amount)
            .then((res) => {
                res.forEach(element => {
                  for(let i = 0;i<element.image.length;i++){
                    element.image[i]='http://localhost:8088/image/'+element.image[i];
                  }
                });
                return Room.find()
                    .then((data)=>{
                        return {
                                Data: res,
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
    }else{
        return Room.find({ $or: [{ name: { $regex: page.search } }, { price: { $regex: page.search } }, { address: { $regex: page.search } }] })
        .sort({ [page.sort]: Type})
        .skip((Page * Amount) - Amount)
        .limit(Amount)
            .then((res) => {
                res.forEach(element => {
                    for(let i = 0;i<element.image.length;i++){
                      element.image[i]='http://localhost:8088/image/'+element.image[i];
                    }
                  });
                return Room.find()
                    .then((data)=>{
                        return {
                                Data: res,
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
function getRoomById(id){
    return Room.findById(id)
    .populate('id_user',{password:0,_id:0,role:0,address:0,avatar:0})
    .then((room) => {
        for(let i = 0 ;i<room.image.length;i++){
            room.image[i]= 'http://localhost:8088/image/'+room.image[i];
        }
        return Promise.resolve(room);
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}