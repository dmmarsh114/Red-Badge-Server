module.exports = (sequelize, DataTypes) => {
    const Meme = sequelize.define('meme', {
        posterUsername: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caption: {
            type: DataTypes.STRING,
            allowNull: true
        },
        voteCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return Meme;
}