import Route from '../structures/Route.js'

export default class logoutGet extends Route {
    constructor() {
        super(['/logout'], 'get', {
            bypassAuth: true
        })
    }

    async handler(req, res) {
        req.logout()
        res.clearCookie('connect.sid');
        res.clearCookie('user')
        res.redirect('/')
    }
}