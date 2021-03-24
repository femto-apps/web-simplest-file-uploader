import { v4 as uuidv4 } from 'uuid'
import config from 'config'
import { join } from 'path'
import multer from 'multer'

import Route from '../../structures/Route.js'
import Utils from '../../utils/Utils.js'

import { createAvailableShort } from '../../modules/short.js'
import { scanFromStream } from '../../modules/scan.js'
import { createItem } from '../../modules/item.js'

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, join(appRoot, config.storage.disk.path))
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4())
    }
})

const fileMulter = multer({
    storage: diskStorage,
    limits: {
        fileSize: config.limits.maxSize,
    },
    fileFilter(req, file, cb) {
        const extension = Utils.getFileExtension(file.originalname)

        if (Utils.isExtensionBlocked(extension)) {
            return cb(`${extension ? `.${extension} files` : `Files with no extension`} are not permitted`)
        }

        return cb(null, true)
    }
}).single('upload')

export default class uploadPost extends Route {
    constructor() {
        super(['/upload'], 'post', {
            allowApiKey: true
        })
    }

    async handler(req, res) {
        if (!req.user && !config.publicUpload) {
            return res.status(401).json({ message: 'Not authorized to use this resource' })
        }

        const error = await new Promise(resolve => fileMulter(req, res, err => resolve(err)))

        if (error) {
            throw error
        }

        if (!req.file) {
            return res.status(415).send("Invalid file.")
        }

        const short = await createAvailableShort()
        const item = await createItem({
            short,
            name: req.file.originalname,
            mime: req.file.mimetype,
            size: req.file.size,
            store: req.file.path,
            user: req.user
        })

        // virus total unfortunately has a max size.
        if (req.file.size < 32 * 1000 * 1000 && config.virustotal.enable) {
            const scanResults = await scanFromStream({
                fileStream: fs.createReadStream(req.file.path),
                size: req.file.size,
                apiKey: config.virustotal.key
            })

            item.virusTotalID = scanResults.data.id
            await item.save()
        }

        return res.json({
            message: 'Successfully uploaded the file.',
            name: req.file.originalname,
            size: req.file.size,
            short
        })
    }
}