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
}