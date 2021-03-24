import config from 'config'

import Route from '../structures/Route.js'
import Utils from '../utils/Utils.js'

export default class blankGet extends Route {
    constructor() {
        super(['/blank'], 'get', {
            bypassAuth: true
        })
    }

    async handler(req, res) {
        res.send('not implemented')
    }
}