import Sequelize from 'sequelize';
import umzugImport from 'umzug'
import config from 'config';

import initItem from './item.js'
import initUser from './user.js'

const { Umzug, SequelizeStorage } = umzugImport
const sequelize = new Sequelize({
    benchmark: true,
    ...config.database
});

const models = {
    Item: initItem(sequelize),
    User: initUser(sequelize),
}

models.Item.belongsTo(models.User)
models.User.hasMany(models.Item)

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