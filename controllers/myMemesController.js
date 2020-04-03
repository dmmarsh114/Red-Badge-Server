const router = require('express').Router();
const db = require('../db');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/'
});

const upload = multer({
    storage: storage
});

// POST //
router.post('/new', upload.single('memeImage'), (req, res) => {

    console.log('UPLOADED FILE', req.file);

    let newMeme = {
        userId: req.user.id,
        username: req.user.username,
        url: req.file.filename,   
        caption: req.body.caption,
        voteCount: req.body.voteCount
    }

    db.meme.create(newMeme)
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// GET user's memes //
router.get('/', (req, res) => {
    db.meme.findAll({ where: { userId: req.user.id } })
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

// UPDATE //
router.put('/update/:id', (req, res) => {
    db.meme.update(req.body, { where: { id: req.params.id } })
        .then(meme => res.status(200).send('meme updated!'))
        .catch(err => res.json({ error: err }))
});

// DELETE //
router.delete('/delete/:id', (req, res) => {
    db.meme.destroy({ where: { id: req.params.id } })
        .then(meme => res.status(200).send('meme successfully deleted!'))
        .catch(err => res.json({ error: err }))
});

module.exports = router;