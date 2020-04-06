const router = require('express').Router();
const db = require('../db');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACESS_ID,
    region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'team6-red-badge',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});

// POST //
router.post('/new', upload.single('memeImage'), (req, res) => {

    console.log('UPLOADED FILE', req.file);

    let newMeme = {
        userId: req.user.id,
        username: req.user.username,
        url: req.file.location,   
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