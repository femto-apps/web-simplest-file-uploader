import database from '../models/index.js'

const { Url } = database

export async function createUrl({ url }) {
    return Url.create({
        url
    })
}

export function redactUrl({ url, createdAt }) {
    return { url, createdAt }
}