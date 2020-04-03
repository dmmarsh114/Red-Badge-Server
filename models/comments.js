module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        memeId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        posterUsername: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        voteCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isReply: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    return Comment;
}