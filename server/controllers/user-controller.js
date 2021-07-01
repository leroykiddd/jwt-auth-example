const userService = require('../service/user-service')


class UserController {
    async registration(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true // защита от доступа в браузере
            })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }


    async login(req, res, next){
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }


    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }



    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error)
        }
    }


    async refresh(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }


    async getUsers(req, res, next){
        try {
            res.json(['123', '2323'])
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new UserController()