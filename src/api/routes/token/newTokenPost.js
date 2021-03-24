import Route from '../../structures/Route.js'
import { v4 as uuidv4 } from 'uuid'
import database from '../../models/index.js'

const { User } = database

export default class newTokenPost extends Route {
    constructor() {
        super(['/api/token/new'], 'post', {})
    }

    async handler(req, res) {
        if (!req.user) {
            return res.status(401).json({ error: 'user not logged in' })
        }

        const key = uuidv4()

        await User.update({
            apikey: key
        }, {
            where: {
                id: req.user.id
            }
        })

        return res.json({
            data: {
                apikey: key
            }
        })
    }
}