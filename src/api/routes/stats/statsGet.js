import config from 'config'
import { getStats } from '../../modules/stats.js'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'


export default class blankGet extends Route {
    constructor() {
        super(['/api/stats'], 'get', {
            bypassAuth: true
        })
    }

    async handler(req, res) {
        const response = await getStats()

        res.json(response)
    }
}