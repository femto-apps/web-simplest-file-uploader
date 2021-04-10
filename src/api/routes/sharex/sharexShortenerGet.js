import config from 'config'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'

export default class sharexShortenerGet extends Route {
    constructor() {
        super(['/sharex/shortener'], 'get', {
            allowAnonymous: true,
            enableSession: true,
            allowApiKey: true
        })
    }

    async handler(req, res) {
        const owner = req.user ? req.user.username : 'anonymous'
        const name = `${config.name.title} (${owner}, url)`
        res.setHeader('Content-disposition', `attachment; filename="${name}.sxcu"`)

        const configuration = {
            Name: name,
            DestinationType: 'URLShortener',
            RequestURL: `${config.name.url}/upload/url`,
            Arguments: {
                apikey: req.user ? req.user.apikey : undefined,
                shortLength: req.query.shortLength,
                url: '$input$'
            },
            URL: `${config.name.url}/$json:short$`,
            ThumbnailURL: `${config.name.url}/thumb/$json:short$`,
        }

        if (req.user) {
            configuration.DeletionURL = `${config.name.url}/delete/$json:data.short$?apikey=${req.user.apikey}`
        }

        res.send(JSON.stringify(configuration))
    }
}