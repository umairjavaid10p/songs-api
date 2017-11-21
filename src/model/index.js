import config from '../config';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const log = require('./logger')();


const db = {};

const createInstance = () => {
    const sequelizeConn = new Sequelize(config.get('mysql.name'), config.get('mysql.username'), config.get('mysql.password'), {
        host: config.get('mysql.host'),
        dialect: 'mysql',
        replication: config.get('mysql.replication'),
    });
    sequelizeConn.authenticate()
        .then(() => {
            console.log('DB Connection has been established successfully.');
        })
        .catch((err) => {
            console.log('Unable to connect to the database:', err);
        });
    return sequelizeConn;
};

const sequelize = createInstance();

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


// sequelize.sync({ force: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
