const {getDB}   = require("../../dbase");
const sequelize = getDB();
const {Model, DataTypes} = require('sequelize');
const Jenis = require("./jenis");

class Barang extends Model {}
Barang.init(
    {
        id_barang:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull:false,
            autoIncrement: false
        },
        nama_barang: {
            type: DataTypes.STRING,
            allowNull:false
        },
        id_jenis:{
            type: DataTypes.STRING,
            allowNull:false,
            references: {
                model: Jenis,
                key:'id_jenis'
            }
        },
        harga: {
            type: DataTypes.STRING,
            allowNull:false
        },
        detai_barang : {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Barang",
        tableName:"barang"
    }
)

Barang.sync({alter:true})
module.exports = Barang;
