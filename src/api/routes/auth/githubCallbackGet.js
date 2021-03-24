import config from 'config'
import passport from 'passport'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'

export default class githubCallbackGet extends Route {
    constructor() {
        super(['/auth/github/callback'], 'get', {
            bypassAuth: true,
            enableSession: true,
            middleware: [passport.initialize(), passport.authenticate('github', {
                failureRedirect: '/'
            })]
        })
    }

    async handler(req, res) {
        res.cookie('user', req.user.username, { expires: req.session.cookie._expires })
        res.redirect('/')
    }
}