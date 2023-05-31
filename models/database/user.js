const Sequelize  = require('sequelize');
const {getDB}   = require("../../dbase");
const sequelize = getDB(); 
const user = sequelize.define('user', {
    id_user: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    nama_user: {
        type: Sequelize.STRING,
    },
    username_user: {
        type: Sequelize.STRING,
    }, 
    password_user: {
        type: Sequelize.STRING,
    },
    nik_user: {
        type: Sequelize.INTEGER,
    },
    alamat_user: {
        type: Sequelize.STRING,
    }, 
    notelp_user: {
        type: Sequelize.INTEGER,
    },
    tipe_user: {
        type: Sequelize.STRING,
    },
    saldo_user: {
        type: Sequelize.STRING
    }
    ,
    status_user: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});
module.exports = (sequelize, Sequelize) => {
    return user; 
}
