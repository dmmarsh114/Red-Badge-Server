const router = require('express').Router();
const db = require('../db');
const multer = require('multer');

// the code below determines where multer will store uploaded images //
const storage = multer.diskStorage({
    // destination -- where the uploaded file will be sent to //
    destination: function (req, file, callBack) {
        // callBack's first argument is an error message. //
        // If the upload goes through, we don't want to see any errors, so the argument is null //
        callBack(null, './uploads/');
    },
    // filename -- what the uploaded file will be called in storage //
    // we can also filter file types and sizes here //
    filename: function (req, file, callBack) {
        callBack(null, file.filename);
    }
});

const fileFilter = function (req, file, callBack) {
    // this statement will only store the file if it is a jpeg or png //
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callBack(null, true); // stores the file
    } else {
        callBack(new Error('invalid file type'), false); // rejects the file
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // can store files up to 5 MB in size
    },
    fileFilter: fileFilter
});

// POST //
router.post('/new', upload.single('memeImage'), (req, res) => {

    console.log(req.file);

    let newMeme = {
        userId: req.user.id,
        username: req.user.username,
        url: req.file.path,    // the file's location is stored as a url(string) in the db  
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