import config from 'config'
import passport from 'passport'
import bcrypt from 'bcryptjs'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'
import database from '../../models/index.js'

const { User, Sequelize } = database

export default class localLoginPost extends Route {
    constructor() {
        super(['/auth/login'], 'post', {
            bypassAuth: true,
            enableSession: true,
            middleware: [passport.initialize()]
        })
    }

    async handler(req, res) {
        const { user_id, password } = req.body

        const user = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ username: user_id }, { email: user_id }]
            }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "No user found"
            })
        }

        bcrypt.compare(password, user.password, (err, validated) => {
            if (err || !validated) return res.status(401).json({
                success: false,
                message: "Invalid password"
            })

            res.cookie('user', user.username, { expires: req.session.cookie._expires })

            req.logIn(user, err => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Internal server error: ' + err.message });
                }
                return res.status(200).json({ success: true, message: 'authentication succeeded' });
            })
        })
    }
}