import config from 'config'

import Route from '../../structures/Route.js'

export default class sharexUploaderGet extends Route {
    constructor() {
        super(['/sharex/uploader'], 'get', {
            allowAnonymous: true,
            enableSession: true,
            allowApiKey: true
        })
    }

    async handler(req, res) {
        const owner = req.user ? req.user.username : 'anonymous'
        const name = `${config.name.title} (${owner}, file:text)`

        res.setHeader('Content-disposition', `attachment; filename="${name}.sxcu"`)

        const configuration = {
            Name: name,
            DestinationType: 'ImageUploader, TextUploader, FileUploader',
            RequestURL: `${config.name.url}/upload`,
            FileFormName: 'upload',
            Arguments: {
                apikey: req.user ? req.user.apikey : undefined,
                shortLength: req.query.shortLength
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