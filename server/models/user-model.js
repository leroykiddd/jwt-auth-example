const {Shema, model} = require('mongoose')

const UserShema = new Shema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})


module.exports = model('User', UserShema)