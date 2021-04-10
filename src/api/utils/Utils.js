import config from 'config'

export default class Utils {
    static isDev() {
        return process.env.NODE_ENV !== 'production'
    }

    static getFileExtension(filename) {
        return filename.split('.').pop()
    }

    static isExtensionBlocked(extension) {
        // block if extension is nothing or in banned list
        return extension === '' || config.limits.bannedExtensions.includes(extension)
    }

    static isMimeBlocked(mime) {
        // block if mime is in banned list`
        return config.limits.bannedMimeTypes.includes(mime)
    }

    static normaliseExpiration(expiry) {
        if (!expiry) return undefined

        const numericalExpiry = Number(expiry)

        if (isNaN(numericalExpiry)) return undefined
        if (numericalExpiry === 0) return undefined

        const maxExpiry = config.limits.maxExpiry * 86400
        const minExpiry = 0

        const expirySeconds = Math.min(Math.max(numericalExpiry, minExpiry), maxExpiry)
        const currentDate = new Date()
        currentDate.setSeconds(currentDate.getSeconds() + expirySeconds)

        return currentDate
    }
}