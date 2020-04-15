const router = require('express').Router();
const db = require('../db')
const validateSession = require('../middleware/validate-session');

// create comment
router.post('/create', validateSession, (req, res) => {
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

// for getting all comment for one user
router.get('/getUserComments/:id', validateSession, (req, res) => {
    db.comment.findAll({
        where: {
            userId: req.user.id
        }
    })
        .then(comment => res.status(200).json(post))
        .catch(err => res.json({
            error: err
        }))
})

// get all comments on one meme
router.get('/getbymeme/:id', (req, res) => {
    db.comment.findAll({
        where: {
            memeId: req.params.id
        }
    })
        .then(comments => res.status(200).json(comments))
        .catch(err => res.json({
            error: err
        }))
})

// get all comment in db
router.get('/getAllComments', (req, res) => {
    db.comment.findAll()
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
});

// edit comment
router.put('/edit/:commentId', validateSession, (req, res) => {
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

// delete comment
router.delete('/delete/:commentId', validateSession, (req, res) => {
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