module.exports = (sequelize, DataTypes) => {
    const Meme = sequelize.define('meme', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        username: {
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