const router = require('express').Router();
const Meme = require('../db').import('../models/memes');

// POST 
router.post('/new', (req, res) => {
    let newMeme = {
        username: req.body.username, // <<-- username and userId should be changed to req.user.username and req.user.userID
        url: req.body.url,        // <<-- this is where multer comes in 
        caption: req.body.caption,
        voteCount: req.body.voteCount
    }

    Meme.create(newMeme)
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// GET by user id
router.get('/', (req, res) => {
    Meme.findAll({ where: { userId: req.user.id } })
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// UPDATE
router.put('/update/:id', (req, res) => {
    Meme.update(req.body, { where: { id: req.params.id } })
        .then(meme => res.status(200).send('meme updated!'))
        .catch(err => res.json({ error: err }))
});

// DELETE
router.delete('/delete/:id', (req, res) => {
    Meme.destroy({ where: { id: req.params.id } })
        .then(meme => res.status(200).send('meme successfully deleted!'))
        .catch(err => res.json({ error: err }))
});

module.exports = router;