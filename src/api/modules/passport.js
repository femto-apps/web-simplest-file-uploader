import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github'
import config from 'config'

import database from '../models/index.js'

const { User, Sequelize } = database

export function setupPassport() {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then(user => done(null, user))
            .catch(err => done(err))
    })

    passport.use(new GithubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackUrl
    },
        async function (accessToken, refreshToken, profile, cb) {
            const { id, username } = profile

            const [user, created] = await User.findOrCreate({
                where: { githubId: id },
                defaults: { username }
            })

            cb(null, user.toJSON())
        }))
}