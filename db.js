const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log(`Connected to ${process.env.DBNAME} postgres database`))
    .then(err => err ? console.log(err) : console.log('no errors here!'))

module.exports = sequelize;