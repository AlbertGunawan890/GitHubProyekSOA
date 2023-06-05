const {getDB}   = require("../../dbase");
const sequelize = getDB();
const {Model, DataTypes} = require('sequelize');

class log_auction extends Model {}
log_auction.init(
    {
        id_log:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull:false,
            autoIncrement: false
        },
        id_auction: {
            type: DataTypes.STRING,
            allowNull:false
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull:false
        },
        bid: {
            type: DataTypes.STRING,
            allowNull:false
        },    
        waktu:{
            type: DataTypes.TIME,
            allowNull:false
        }    
    },
    {
        sequelize,
        timestamps: false,
        modelName: "log_auction",
        tableName:"log_auction"
    }
)

log_auction.sync({alter:true})
module.exports = log_auction;
