import database from '../models/index.js'

const { Contact } = database

export async function createContact({ method, address, message, ip }) {
    return Contact.create({
        method,
        address,
        message,
        ip
    })
}

export function redactContact({ id, method, address, message, ip, createdAt, updatedAt }) {
    return { id, method, address, message, ip, createdAt, updatedAt }
}