const router = require('express').Router();
const db = require('../db')

router.post('/create', (req, res) => {

    db.comment.create({
        memeId: req.body.memeId,
        posterUsername: req.user.username,
        comment: req.body.comment,
        voteCount: req.body.voteCount,
        isReply: req.body.isReply
    })
        .then(comment => {
            res.json(comment);
        });
});

router.put('/edit/:commentId', (req, res) => {
    db.comment.update({
        comment: req.body.comment,
    }, {
        where: {
            id: req.params.commentId
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        }))
})

router.delete('/delete/:commentId', (req, res) => {
    db.comment.destroy({
        where: {
            id: req.params.commentId
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json({
            error: err
        }))
})

module.exports = router;