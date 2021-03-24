import path from 'path'
import Server from './src/api/structures/Server.js'

global.appRoot = path.resolve()

const server = new Server()
server.start()