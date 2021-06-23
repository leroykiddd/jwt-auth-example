const {Shema, model} = require('mongoose')

const TokenShema = new Shema({
    user: {type: Shema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})


module.exports = model('Token', TokenShema)