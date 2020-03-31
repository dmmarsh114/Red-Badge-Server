module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        posterUsername: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
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