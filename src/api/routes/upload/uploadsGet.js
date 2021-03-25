import Route from '../../structures/Route.js'
import { referenceFromUser, redactReference } from '../../modules/reference.js'
import { redactFile } from '../../modules/file.js'

export default class uploadsGet extends Route {
    constructor() {
        super(['/api/uploads'], 'get', {
            allowApiKey: true
        })
    }

    async handler(req, res) {
        const references = await referenceFromUser({ id: req.user.id })

        res.json({
            items: await Promise.all(references.map(async reference => {
                const item = await reference.getItem()
                return {
                    ...redactFile(item),
                    ...redactReference(reference)
                }
            }))
        })
    }
}