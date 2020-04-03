require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log(`Connected to ${process.env.DBNAME} postgres database`))
    .then(err => err ? console.log(err) : console.log('no errors here!'))

const db = {}; // putting all models in one db object for easy accessibility

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.user = require('./models/user')(sequelize, Sequelize);
db.meme = require('./models/memes')(sequelize, Sequelize);
db.comment = require('./models/comments')(sequelize, Sequelize);

//db relations
db.user.hasMany(db.meme);
db.meme.belongsTo(db.user);
db.meme.hasMany(db.comment);
db.comment.belongsTo(db.meme);

// console.log(db);

module.exports = db;