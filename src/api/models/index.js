import Sequelize from 'sequelize';
import umzugImport from 'umzug'
import config from 'config';

// import initItem from './item.js'
import initUser from './user.js'
import initReference from './reference.js'
import initFile from './file.js'

const { Umzug, SequelizeStorage } = umzugImport
const sequelize = new Sequelize({
    benchmark: true,
    ...config.database
});

const models = {
    User: initUser(sequelize),
    Reference: initReference(sequelize),
    File: initFile(sequelize)
}

models.Reference.belongsTo(models.User)
models.User.hasMany(models.Reference)

models.Reference.prototype.getItem = function () {
    switch (this.type) {
        case 'FILE':
            return models.File.findOne({ where: { id: this.ItemId } })
        default:
            throw new Error('Unexpected type: ' + this.type)
    }
}

export async function upMigrations() {
    const umzug = new Umzug({
        migrations: { glob: 'src/api/migrations/*.cjs' },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console
    })

    const migrations = await umzug.up()
}

export default {
    sequelize,
    Sequelize,
    ...models
}