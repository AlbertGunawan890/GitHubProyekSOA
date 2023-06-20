const {getDB}   = require("../../dbase");
const sequelize = getDB();
const {Model, DataTypes} = require('sequelize');
const Barang = require("./barang");

class Auction extends Model {}
Auction.init(
    {
        id_auction:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull:false,
            autoIncrement: false
        },
        nama: {
            type: DataTypes.STRING,
            allowNull:false
        },
        tanggal: {
            type: DataTypes.DATEONLY,
            allowNull:false
        },
        waktu_awal: {
            type: DataTypes.TIME,
            allowNull:false
        },
        waktu_akhir: {
            type: DataTypes.TIME,
            allowNull:false
        },
        id_barang: {
            type: DataTypes.STRING,
            allowNull:false,
            // references: {
            //     model: Barang,
            //     key:'id_barang'
            // }
        },
        minimal_bid: {
            type: DataTypes.STRING,
            allowNull:false
        },
        pemenang:{
            type: DataTypes.STRING,
            allowNull:true
        }
        
    },
    {
        sequelize,
        timestamps: false,
        modelName: "Auction",
        tableName:"Auction"
    }
)

Auction.sync({alter:true})
module.exports = Auction;
