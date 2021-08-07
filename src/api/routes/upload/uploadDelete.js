import fsCallback from 'fs'

import Route from '../../structures/Route.js'
import { itemFromShort } from '../../modules/reference.js'
import { deleteItem } from '../../modules/meta.js'

const fs = fsCallback.promises

export default class uploadDelete extends Route {
    constructor() {
        super(['/api/upload/:short'], 'delete', {
            allowApiKey: true
        })
    }

    async handler(req, res) {
        const { item, reference } = await itemFromShort({ short: req.params.short })

        await deleteItem(reference, item)

        res.json({
            removed: true
        })
    }
}