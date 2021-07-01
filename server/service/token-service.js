const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')


class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '10d'})

        return { accessToken, refreshToken }
    }


    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({userId})
            if (tokenData) {
                tokenData.refreshToken = refreshToken
                return tokenData.save();
            }
            const token = await tokenModel.create({user: userId, refreshToken})
            return token;
    }

    async removeToken(refreshToken) {
        try {
            const tokenData = await tokenModel.deleteOne(refreshToken)
            return tokenData
        } catch (error) {
            console.log(error);
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData;
    }
}


module.exports = new TokenService() 