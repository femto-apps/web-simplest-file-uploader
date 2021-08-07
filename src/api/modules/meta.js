import fsCallback from 'fs'

const fs = fsCallback.promises

export async function deleteItem(reference, item) {
    switch (reference.type) {
        case 'FILE':
            await fs.unlink(item.store)
            break
        case 'URL':
            // we actually don't need to do anything here!
            break
        default:
            throw new Error('Deletion not implemented for this type yet.')
            break
    }

    await item.destroy()
    await reference.destroy()
}