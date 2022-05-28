const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Todo',{
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        active : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        completed : {
            type : DataTypes.BOOLEAN,
            allowNull : false    
        }
    })
}