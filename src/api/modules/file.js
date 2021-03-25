import database from '../models/index.js'

const { File } = database

export async function createFile({ name, mime, size, store }) {
    return File.create({
        name,
        mime,
        size,
        store
    })
}

export function redactFile({ id, name, mime, size, virus, createdAt }) {
    return { id, name, mime, size, virus, createdAt }
}