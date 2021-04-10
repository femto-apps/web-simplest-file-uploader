import database from '../models/index.js'

const { Reference } = database

export async function createReference({ short, type, ip, item, user, expiration }) {
    return Reference.create({
        short,
        type,
        ip,
        expiration,
        ItemId: item && item.id,
        UserId: user && user.id
    })
}

export function referenceFromShort({ short }) {
    return Reference.findOne({ where: { short } })
}

export async function itemFromShort({ short }) {
    const reference = await referenceFromShort({ short })

    if (!reference) return {}

    const item = await reference.getItem()

    return {
        reference,
        item
    }
}

export async function referenceFromUser({ id }) {
    return Reference.findAll({
        where: { UserId: id }
    })
}

export function redactReference({ short, views, type }) {
    return { short, views, type, expiration }
}