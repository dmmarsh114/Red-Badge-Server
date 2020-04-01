const router = require('express').Router();
const db = require('../db');
const multer = require('multer');

// the code below determines where multer will store uploaded images //
const storage = multer.diskStorage({
    // filename -- what the uploaded file will be called in storage //
    // we can also filter file types and sizes here //
    filename: function (req, file, callBack) {
        callBack(file.filename);
    }
});

const upload = multer({
    storage: storage,
    dest: '/uploads/',
    limits: {
        fileSize: 1024 * 1024 * 5 // can store files up to 5 MB in size
    }
});

// POST //
router.post('/new', upload.single('memeImage'), (req, res) => {

    console.log('UPLOADED FILE', req.file);
    console.log('UPLOADED FILE PATH', req.file.path);
    console.log('UPLOADED FILE PATH IS OF TYPE...', typeof req.file.path);

    let newMeme = {
        userId: req.user.id,
        username: req.user.username,
        url: (req.file.path).toString(), // the file's location is stored as a url(string) in the db  
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