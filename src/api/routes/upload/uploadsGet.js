import Route from '../../structures/Route.js'
import { itemFromUser, redactItem } from '../../modules/item.js'

export default class uploadsGet extends Route {
    constructor() {
        super(['/api/uploads'], 'get', {
            allowApiKey: true
        })
    }

    async handler(req, res) {
        const items = await itemFromUser({ id: req.user.id })

        res.json({
            items: items.map(item => redactItem(item))
        })
    }
}