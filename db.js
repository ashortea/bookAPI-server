const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect : 'postgres'
});


const User = sequelize.import('./models/user');
const Book = sequelize.import('./models/book');

sequelize.authenticate()
    .then(() => console.log('connected to DB.'))
    .catch((err) => console.error(`Connection Error : ${err.message}`));

module.exports = sequelize;