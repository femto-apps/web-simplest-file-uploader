import database from '../models/index.js'

const { Item } = database

export async function createItem({ short, name, mime, size, store, user }) {
    return Item.create({
        short,
        name,
        mime,
        size,
        store,
        UserId: user && user.id
    })
}

export function itemFromShort({ short }) {
    return Item.findOne({ where: { short } })
}

export async function itemFromUser({ id }) {
    return Item.findAll({
        where: { UserId: id }
    })
}

export function redactItem({ id, short, name, mime, size, virus, createdAt }) {
    return { id, short, name, mime, size, virus, createdAt }
}