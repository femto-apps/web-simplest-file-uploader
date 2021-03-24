import passport from 'passport'
import cookieParser from 'cookie-parser'
import SequelizeSessionStore from 'connect-session-sequelize'
import session from 'express-session'
import config from 'config'

import Database from '../models/index.js'

const { sequelize } = Database

export default class Route {
    constructor(path, method, options) {
        if (!path) throw new Error('Every route needs a URL associated with it.')
        if (!method) throw new Error('Every route needs its method specified.')

        this.path = path
        this.method = method
        this.options = Object.assign({
            bypassAuth: false,
            allowAnonymous: false,
            allowApiKey: false,
            enableSession: false,
            middleware: []
        }, options)

        const SequelizeStore = SequelizeSessionStore(session.Store)

        const store = new SequelizeStore({
            db: sequelize
        })

        this.middleware = []

        // auth requires cookies and session information
        if (this.options.enableSession || !this.options.bypassAuth) {
            this.middleware.push(cookieParser())
            this.middleware.push(session({
                store,
                secret: config.cookie.secret,
                cookie: {
                    maxAge: 4 * 7 * 24 * 60 * 60 * 1000 // 28 days
                },
                resave: false,
                saveUninitialized: false
            }))
        }

        this.middleware = [
            ...this.middleware,
            ...this.options.middleware
        ]

        if (!this.options.bypassAuth) {
            this.middleware.push(passport.initialize())
            this.middleware.push(passport.session())

            if (!this.options.allowAnonymous) {
                this.middleware.push((req, res, next) => {
                    if (!req.user) {
                        return res.status(401).json({ error: 'user not logged in' })
                    }

                    next()
                })
            }
        }
    }
}