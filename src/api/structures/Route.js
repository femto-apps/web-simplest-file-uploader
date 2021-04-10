import passport from 'passport'
import cookieParser from 'cookie-parser'
import SequelizeSessionStore from 'connect-session-sequelize'
import session from 'express-session'
import config from 'config'

import Database from '../models/index.js'

const { sequelize, User } = Database

const SequelizeStore = SequelizeSessionStore(session.Store)

const store = new SequelizeStore({
    db: sequelize
})

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

            if (this.options.allowApiKey) {
                this.middleware.push(async (req, res, next) => {
                    const key = (req.query && req.query.apikey) || (req.body && req.body.apikey)

                    if (!key) {
                        return next()
                    }

                    const user = await User.findOne({
                        where: {
                            apikey: key
                        }
                    })

                    if (!user) {
                        return res.status(401).json({ error: 'invalid api key' })
                    }

                    req.user = user
                    return next()
                })
            }

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