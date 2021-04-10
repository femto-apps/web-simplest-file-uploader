import { itemFromShort } from '../modules/reference.js'
import Route from '../structures/Route.js'
import contentDisposition from 'content-disposition'
import sendRanges from 'send-ranges'
import { isFileVirus } from '../modules/scan.js'
import config from 'config'
import fs from 'fs'

function retrieveFile({ item }) {
    return {
        getStream: range => fs.createReadStream(item.store, range),
        type: item.mime,
        size: item.size
    }
}

const sendRange = sendRanges(retrieveFile)

export default class fileGet extends Route {
    constructor() {
        super(['*'], 'get', {
            bypassAuth: true,
            routeAtEnd: true
        })
    }

    async handler(req, res, next) {
        const short = req.originalUrl.split('/')[1]

        if (short === '_next' || short === '' || short === 'sw-debug.js' || short.startsWith('__nextjs')) {
            return next()
        }

        const { item, reference } = await itemFromShort({ short })

        console.log(reference)

        if (!item) {
            return next()
        }

        switch (reference.type) {
            case 'FILE':
                break
            case 'URL':
                return res.redirect(item.url)
            default:
                throw new Error('Type not implemented yet: ' + reference.type)
        }

        if (item.virus) {
            return res.send("This file was detected as a virus and removed.")
        }

        res.set('Content-Disposition', contentDisposition(item.name, { type: 'inline' }))
        res.set('Content-Type', item.mime)
        res.set('Cache-Control', 'public, max-age=604800, immutable')

        if (config.virustotal.enable && item.virusTotalID && item.virus === null) {
            const { complete, suspicious } = await isFileVirus({
                virusTotalID: item.virusTotalID,
                apiKey: config.virustotal.key
            })

            if (complete) {
                item.virus = suspicious
                await item.save()
            }
        }

        req.item = item
        req.reference = reference

        sendRange(req, res, () => {
            req.reference.increment('views')

            res.set('Content-Length', item.size)
            res.set('Accept-Ranges', 'bytes')
            res.writeHead(200)

            fs.createReadStream(item.store).pipe(res)
        })
    }
}