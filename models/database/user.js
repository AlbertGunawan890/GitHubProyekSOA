const {getDB}   = require("../../dbase");
const sequelize = getDB();
const {Model, DataTypes} = require('sequelize');

class User extends Model {}
User.init(
    {
        id_user: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            autoIncrement: false
        },
        nama_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username_user: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email_user: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        password_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nik_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alamat_user: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        notelp_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipe_user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        saldo_user: {
            type: DataTypes.STRING,
            allowNull: false
        }
        ,
        status_user: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "user",
        tableName: "users"
    }
)
User.sync({alter:true})
module.exports = User;