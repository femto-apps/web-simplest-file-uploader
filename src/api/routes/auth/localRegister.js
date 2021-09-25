import config from 'config'
import passport from 'passport'
import * as EmailValidator from 'email-validator';

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'
import database from '../../models/index.js'

const { User, Sequelize } = database

export default class localRegisterPost extends Route {
    constructor() {
        super(['/auth/register'], 'post', {
            bypassAuth: true,
            enableSession: true,
            middleware: [passport.initialize()]
        })
    }

    async handler(req, res) {
        const { username, email, password } = req.body

        if (email && !EmailValidator.validate(email)) {
            return res.status(401).json({
                success: false,
                message: "Email exists, but email is invalid.  Either remove it, or provide a valid one.",
                field: "email"
            })
        }

        if (username.length < 3) {
            return res.status(401).json({
                success: false,
                message: "Username too short, must be at least 3 characters",
                field: "username"
            })
        }

        if (password.length < 3) {
            return res.status(401).json({
                success: false,
                message: "Password too short, must be at least 3 characters",
                field: "password"
            })
        }

        const existingUser = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ username: username }, { email: email }]
            }
        })

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "Username or email already exists"
            })
        }

        const user = await User.create({
            username, email, password
        })

        res.cookie('user', user.username, { expires: req.session.cookie._expires })

        req.logIn(user, err => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Internal server error: ' + err.message });
            }
            return res.status(200).json({ success: true, message: 'authentication succeeded' });
        })
    }
}