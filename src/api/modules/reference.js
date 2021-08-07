import database from '../models/index.js'
import { deleteItem } from './meta.js'

const { Reference, Sequelize } = database

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
        where: { UserId: id },
        order: [['createdAt', 'DESC']]
    })
}

export function redactReference({ short, views, type, expiration, createdAt }) {
    return { short, views, type, expiration, createdAt }
}

export async function expireOldReferences() {
    const expiredReferences = await Reference.findAll({
        where: {
            expiration: {
                [Sequelize.Op.lte]: new Date()
            }
        }
    })

    await Promise.all(expiredReferences.map(async reference => {
        const item = await reference.getItem()

        console.log('Expiring', reference.short)

        await deleteItem(reference, item)
    }))
}