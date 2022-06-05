const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Todo',{
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        active : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
            allowNull : false
        },
        completed : {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false    
        }
    })
}