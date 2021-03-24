import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github'
import config from 'config'

import database from '../models/index.js'

const { User } = database

export function setupPassport() {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err))
    })

    passport.use(new GithubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: "http://127.0.0.1:8080/auth/github/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            const { id, username } = profile

            const [user, created] = await User.findOrCreate({
                where: { id },
                defaults: { username }
            })

            cb(null, user.toJSON())
        }))
}