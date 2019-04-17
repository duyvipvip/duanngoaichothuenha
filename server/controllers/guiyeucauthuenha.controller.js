var guiyeucauthuenha = require('../models/guiyeucauthuenha.model');
module.exports = {
    taoYeuCauThueNha: taoYeuCauThueNha,
    CheckNgoiNhaDaThue: CheckNgoiNhaDaThue,
    xoaYeuCauThueNha: xoaYeuCauThueNha
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
