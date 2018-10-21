var Contact = require('../models/contact.model');
var path = require('path');
var ErrorUser = require('../Error/errorUser');
var Status = require('../constants/status');
module.exports = {
    CreateContact:CreateContact,
    GetContact:GetContact
}
function CreateContact(body){
    let contact = new Contact(body);
    return contact.save()
        .then((res)=>{
            return Promise.resolve(res);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
function GetContact(){
    return Contact.find()
        .then((res)=>{
            return Promise.resolve(res);
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
