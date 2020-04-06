const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    db.user.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60*60*24
            })
            res.json({
                user: user,
                message: 'User Created',
                sessionToken: token
            })
        }, createError = err => res.send(500, err)
    )
});

router.post('/login', (req, res) => {
    db.user.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET, {
                        expiresIn: 60*60*24
                    })
                    res.json({
                        user: user,
                        message: 'User Successfully Logged In',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'Bad Gateway'})
                }
            })
        } else {
            res.status(500).send({error: 'Failed To Authenticate'})
        }
    }, err => res.status(501).send({error: 'Failed To Process'}))
})

//Get all user, meme, and comment data
router.get('/users', (req, res) => {
    db.user.findAll({
        include: [
            {
                model: db.meme,
                include: [
                    {
                        model: db.comment
                    }
                ]
            }
        ]
    }).then(users => {
        const responseObject = users.map(user => {

            return Object.assign(
                {},
                {
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                    meme: user.meme.map(meme => {

                        return Object.assign(
                            {},
                            {
                                memeId: meme.id,
                                userId: meme.userId,
                                url: meme.url,
                                voteCount: meme.voteCount,
                                caption: meme.caption,
                                comment: this.post.comment.map(comment => {

                                    return Object.assign(
                                        {},
                                        {
                                            commentId: comment.id,
                                            memeId: comment.memeId,
                                            posterUsername: comment.posterUsername,
                                            comment: comment.comment
                                        }
                                    )
                                })
                            }
                        )
                    })
                }
            )
        })
        res.json(resObj)
    })
})

module.exports = router;