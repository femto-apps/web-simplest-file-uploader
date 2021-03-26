import database from '../models/index.js'

const { Reference } = database

const alphabet = '23456789abcdefghijkmnpqrstuvwxyz'

export function createRandomShort({ length = 4 }) {
    let short = ''

    for (let i = 0; i < length; i++) {
        short += alphabet[Math.floor(Math.random() * Math.floor(alphabet.length))]
    }

    return short
}

export function limitShortLength(shortLength = 4) {
    if (shortLength < 4 || shortLength > 64) {
        shortLength = 4
    }

    return shortLength
}

export async function createAvailableShort({ shortLength }) {
    while (true) {
        const short = createRandomShort({ length: shortLength })

        if (await Reference.findOne({ where: { short } })) {
            continue
        }

        return short
    }
}