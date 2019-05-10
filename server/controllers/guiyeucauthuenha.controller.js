var guiyeucauthuenha = require('../models/guiyeucauthuenha.model');
var thanhtoan = require('../models/thanhtoan.model');
var Room = require('../models/room.model');
module.exports = {
    taoYeuCauThueNha: taoYeuCauThueNha,
    CheckNgoiNhaDaThue: CheckNgoiNhaDaThue,
    xoaYeuCauThueNha: xoaYeuCauThueNha,
    layCacYeuCauThueNhaCuaUser: LayCacYeuCauThueNhaCuaUser,
    thaydoitrangthai: Thaydoitrangthai
}

function xoaYeuCauThueNha(model){
    return guiyeucauthuenha.findOneAndDelete({ idnguoigui: model.idnguoigui, idngoinha: model.idngoinha  })
    .then((data) => {
        return Promise.resolve(data);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

function CheckNgoiNhaDaThue(model){
    return guiyeucauthuenha.findOne({ idnguoigui: model.idnguoigui, idngoinha: model.idngoinha  })
        .then((data) => {
            return (data) ? true : false;
        }).catch((err) => {
            return Promise.reject(err);
        })
}
//
function taoYeuCauThueNha(body) {
    var newObjectBody = {
        "idnguoigui": body.idnguoigui,
        "idngoinha": body.idngoinha,
        "chungminhthu": body.chungminhthu,
        "sodienthoai": body.sodienthoai,
        "tennguoigui": body.tennguoigui,
        "note": body.note,
        "diachi": body.diachi,
        "hinhchungminhnhandan": body.hinhchungminhnhandan
    }
    return guiyeucauthuenha.findOne({ idnguoigui: body.idnguoigui, idngoinha: body.idngoinha  })
        .then(((renthouse) => {
            if (renthouse == null) {
                let newRentHouse = new guiyeucauthuenha(newObjectBody)
                return newRentHouse.save().then((res) => {
                    return Promise.resolve(res);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    })
            }else{
                return guiyeucauthuenha.findOneAndUpdate({ idnguoigui: body.idnguoigui, idngoinha: body.idngoinha  }, newObjectBody)
                .then((data) => {
                    return Promise.resolve(data);
                })
                .catch((err) => {
                    return Promise.reject(err);
                })
            }
           
        }))

}

// lấy yêu câu thuê nhà của một tài khoản
function LayCacYeuCauThueNhaCuaUser(model){
    return guiyeucauthuenha.find().populate('idngoinha')
    .then((data) => {
        return Promise.resolve(data);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

// thay đổi trạng thái
function Thaydoitrangthai(idyeucau, status, idhouse){
    if (status == 1) {
        return guiyeucauthuenha.update({ "_id": idyeucau }, { $set: { "trangthai": status } })
            .then((room) => {
                return Room.update({ "_id": idhouse }, { $set: { "trangthaidathue": true } })
                .then(() => {
                    let body = {
                        idhouse: idhouse,
                        idyeucau: idyeucau
                    }
                    console.log(body)
                    return thanhtoan.create(body)
                        .then(() => {
                            return Promise.resolve(room);
                        })
                });
                
               
            })
            .catch((err) => {

            })
    } else {
        return Room.update({ "_id": idhouse}, { $set: { "trangthai": status} })
            .then((room) => {
                return Promise.resolve(room);
            })
            .catch((err) => {

            })
    }
}