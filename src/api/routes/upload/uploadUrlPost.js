import config from 'config'
import multer from 'multer'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'

import { createUrl } from '../../modules/url.js'
import { createAvailableShort, limitShortLength } from '../../modules/short.js'
import { createReference } from '../../modules/reference.js'

const short = multer({})

export default class uploadPost extends Route {
    constructor() {
        super(['/upload/url'], 'post', {
            allowApiKey: true,
            allowAnonymous: true,
            middleware: [short.none()]
        })
    }

    async handler(req, res) {
        if (!req.user && !config.publicUpload) {
            return res.status(401).json({ message: 'Not authorized to use this resource' })
        }

        const expiry = Utils.normaliseExpiration(req.body.expirationTime)
        const shortLength = limitShortLength(req.body.shortLength)
        const short = await createAvailableShort({ shortLength })
        const item = await createUrl({
            url: req.body.url
        })
        const reference = await createReference({
            short,
            item,
            type: 'URL',
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            user: req.user,
            expiration: expiry
        })

        return res.json({
            message: 'Successfully shortened url.',
            short
        })
    }
}