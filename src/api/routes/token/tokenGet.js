import Route from '../../structures/Route.js'

export default class tokenGet extends Route {
    constructor() {
        super(['/api/token'], 'get', {})
    }

    async handler(req, res) {
        if (!req.user) {
            return res.status(401).json({ error: 'user not logged in' })
        }

        return res.json({ data: { token: req.user.apikey } })
    }
}