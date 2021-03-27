import config from 'config'
import { createContact } from '../../modules/contact.js'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'

export default class contactPost extends Route {
    constructor() {
        super(['/api/contact'], 'post', {
            bypassAuth: true
        })
    }

    async handler(req, res) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        const { method, message, address } = req.body

        await createContact({ method, message, address, ip })

        res.json({
            message: 'Sent message to owners'
        })
    }
}