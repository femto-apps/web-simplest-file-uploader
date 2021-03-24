import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import next from 'next'
import http from 'http'
import config from 'config'
import jetpack from 'fs-jetpack'

import Utils from '../utils/Utils.js'
import { setupPassport } from '../modules/passport.js'
import { upMigrations } from '../models/index.js'

export default class Server {
    constructor() {
        const server = express()
        const app = next({ dev: Utils.isDev(), dir: './src/frontend' })

        server.set('trust proxy', 1)
        server.use(helmet({
            contentSecurityPolicy: false
        }))

        server.use(bodyParser.urlencoded({ extended: false }))
        server.use(bodyParser.json())

        this.server = server
        this.app = app
        this.nextHandle = app.getRequestHandler()
    }

    async start() {
        await upMigrations()
        await this.app.prepare()
        setupPassport()
        await this.registerRoutes()

        this.server.get('*', async (req, res, next) => {
            return this.nextHandle(req, res, next)
        })

        http.createServer(this.server).listen(config.port, () => {
            console.log(`listening on port ${config.port}`)
        })
    }

    async registerRoutes() {
        const routes = jetpack.find('./src/api/routes', { matching: '*.js' })

        const routeAtEnd = []

        for (let routePath of routes) {
            try {
                const Route = (await import(`../../../${routePath}`)).default
                const route = new Route()

                if (route.options.routeAtEnd) {
                    routeAtEnd.push(route)
                    continue
                }

                this.server[route.method](route.path, ...route.middleware, route.handler)
            } catch (e) {
                console.log('Failed to import', routePath)
                throw new Error(e)
            }
        }

        for (let route of routeAtEnd) {
            this.server[route.method](route.path, ...route.middleware, route.handler)
        }
    }
}