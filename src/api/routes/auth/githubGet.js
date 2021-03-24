import config from 'config'
import passport from 'passport'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'

export default class githubGet extends Route {
    constructor() {
        super(['/auth/github'], 'get', {
            bypassAuth: true,
            middleware: [passport.initialize(), passport.authenticate('github')]
        })
    }

    async handler(req, res) { }
}