const express = require('express');
const router = express.Router();
const Meme = require("../db").import('../models/memes')

// Get All Request //
router.get('/all', (req, res) => {
    Meme.findAll()
    .then(meme => res.status(200).json(meme))
    .catch(err => res.status(500).json({
        error: err
    }))
})


// Get By Username //
router.get('/:username', (req, res) => {
    Meme.findAll({
            where: {
                username: req.params.username
            }
        })
        .then(meme => res.status(200).json(meme))
        .catch(err => res.status(500).json({
            error: err
        }))
})

module.exports = router;