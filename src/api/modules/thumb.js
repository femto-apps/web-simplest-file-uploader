import pureimage from 'pureimage'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

async function createUnknownThumb({ reference, item }) {
    const image = pureimage.make(256, 256)
    const ctx = image.getContext('2d')

    const unknownImagePath = path.posix.join(__dirname, '../../frontend/public/unknown_file.png')
    const unknown = await pureimage.decodePNGFromStream(fs.createReadStream(unknownImagePath))
    ctx.drawImage(unknown, 0, 0)

    ctx.font = '25px Sans'
    ctx.textAlign = 'center';

    let name = item.name

    if (name) {
        if (name.length > 19) {
            name = name.substring(0, 16) + '...'
        }

        ctx.fillText(name, 128, 220, 242)
    }

    const uuid = uuidv4()

    const thumbPath = path.join(config.storage.disk.path, 'thumbs', uuid)
    await pureimage.encodePNGToStream(image, fs.createWriteStream(thumbPath))

    return thumbPath
}

export function generateThumb({ reference, item }) {
    switch (reference.type) {
        case 'FILE':
            const store = await createUnknownThumb({ reference, item })



            console.log(store)
    }

    reference.short
    item.name
    item.mime
    item.store
}