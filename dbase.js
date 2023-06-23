const Sequelize = require("sequelize");
const db = new Sequelize(
    'freedb_proyek_soa', // database name
    'freedb_dbproyeksoa', // database username
    '$zd4Vmd*SyNUj74', // database password
    {
        host: 'sql.freedb.tech', // database host
        port: 3306, // default MySQL port
        dialect: "mysql",
        logging: true,
        timezone: "+07:00",
        dialectOptions: {
            connectTimeout: 30000 }
        }
);
module.exports = {
    initDB: () => {
        return db.authenticate();
    },
    getDB: () => {
        return db;
    },
};