const {getDB}   = require("../../dbase");
const sequelize = getDB();
const {Model, DataTypes} = require('sequelize');

class Jenis extends Model {}
Jenis.init(
    {
        id_jenis:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            autoIncrement: false
        },
        nama_jenis: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Jenis",
        tableName: "jenis"
    }
)
Jenis.sync({alter:true})
module.exports = Jenis;