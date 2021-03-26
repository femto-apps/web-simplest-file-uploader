import config from 'config'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'

import { createUrl } from '../../modules/url.js'
import { createAvailableShort, limitShortLength } from '../../modules/short.js'
import { createReference } from '../../modules/reference.js'

export default class uploadPost extends Route {
    constructor() {
        super(['/upload/url'], 'post', {
            allowApiKey: true
        })
    }

    async handler(req, res) {
        if (!req.user && !config.publicUpload) {
            return res.status(401).json({ message: 'Not authorized to use this resource' })
        }


        const shortLength = limitShortLength(req.body.shortLength)
        const short = await createAvailableShort({ shortLength })
        const item = await createUrl({
            url: req.body.url
        })
        const reference = await createReference({
            short,
            item,
            type: 'URL',
            ip: 'not implemented',
            user: req.user
        })

        return res.json({
            message: 'Successfully shortened url.',
            short
        })
    }
}