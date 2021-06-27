const userModel = require('../models/user-model')
const bcrypt = require('bcrypt') 
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')


class UserService {

    async registration(email, password) {
        const candidate = await userModel.findOne({email})
        if (candidate) {
            throw new Error(`Пользователь с почтой ${email} уже существует!`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const acticationLink = uuid.v4()
        
        const user = await userModel.create({email, password: hashPassword})
        await mailService.sendActicationMail(email, acticationLink)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...UserDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
}


module.exports = new UserService() 