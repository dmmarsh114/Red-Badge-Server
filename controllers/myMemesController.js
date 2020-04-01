const router = require('express').Router();
const db = require('../db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// POST //
router.post('/new', upload.single('memeImage'), (req, res) => {

    console.log(req.file);

    let newMeme = {
        username: req.user.username,
        userId: req.user.id,
        url: req.body.url,        // <<-- this is where multer comes in 
        caption: req.body.caption,
        voteCount: req.body.voteCount
    }

    db.memes.create(newMeme)
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// GET user's memes //
router.get('/', (req, res) => {
    db.memes.findAll({ where: { userId: req.user.id } })
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// UPDATE //
router.put('/update/:id', (req, res) => {
    db.memes.update(req.body, { where: { id: req.params.id } })
        .then(meme => res.status(200).send('meme updated!'))
        .catch(err => res.json({ error: err }))
});

// DELETE //
router.delete('/delete/:id', (req, res) => {
    db.memes.destroy({ where: { id: req.params.id } })
        .then(meme => res.status(200).send('meme successfully deleted!'))
        .catch(err => res.json({ error: err }))
});

module.exports = router;