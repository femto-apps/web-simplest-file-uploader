import fsCallback from 'fs';

import Route from '../../structures/Route.js'
import { itemFromShort, redactItem } from '../../modules/item.js'

const fs = fsCallback.promises

export default class uploadDelete extends Route {
    constructor() {
        super(['/api/upload/:short'], 'delete', {
            allowApiKey: true
        })
    }

    async handler(req, res) {
        const item = await itemFromShort({ short: req.params.short })

        await fs.unlink(item.store)
        await item.destroy()

        res.json({
            removed: true
        })
    }
}