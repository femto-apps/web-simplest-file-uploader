import database from '../models/index.js'

const { Reference, File } = database

export async function getStats() {
    const totalItems = await Reference.count()
    const totalSize = await File.sum('size')

    return {
        totalItems,
        totalSize
    }
}