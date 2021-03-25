import fsCallback from 'fs';

import Route from '../../structures/Route.js'
import { itemFromShort } from '../../modules/reference.js'

const fs = fsCallback.promises

export default class uploadDelete extends Route {
    constructor() {
        super(['/api/upload/:short'], 'delete', {
            allowApiKey: true
        })
    }

    async handler(req, res) {
        const { item, reference } = await itemFromShort({ short: req.params.short })

        switch (reference.type) {
            case 'FILE':
                await fs.unlink(item.store)
                break
            default:
                throw new Error('Deletion not implemented for this type yet.')
                break
        }

        await item.destroy()
        await reference.destroy()

        res.json({
            removed: true
        })
    }
}