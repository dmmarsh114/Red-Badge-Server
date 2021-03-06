const express = require('express');
const router = express.Router();
const db = require("../db");

// added comments to be included in meme fetch for get all db memes
// Get All Request //
router.get('/all', (req, res) => {
    db.meme.findAll({
        include: [
            {
                model: db.comment
            }
        ]
    })
        .then(meme => res.status(200).json(meme))
        .catch(err => res.status(500).json({
            error: err
        }))
});

// Get By Username //
router.get('/:username', (req, res) => {
    db.meme.findAll({
        where: {
            username: req.params.username
        }
    })
        .then(meme => res.status(200).json(meme))
        .catch(err => res.status(500).json({
            error: err
        }))
});

module.exports = router;