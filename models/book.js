module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },

        author : { 
            type : DataTypes.STRING,
            allowNull : false
        },

        genre : {
            type : DataTypes.STRING,
            allowNull : false
        },

        pubYear : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        rating : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        userId : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });

    return Book;
};