const express = require('express');
const router = express.Router();
const db = require("../db");

// Get
router.get('/:postId', (req, res) => {
    db.meme.get(req.body, {
        where: {
            id: req.params.postId
        }
    })
        .then(vote => res.status(200).json(vote))
        .catch(err => res.json(req.errors))
})


// Put Request //
router.put('/:postId', (req, res) => {
    db.meme.update(req.body, {
        where: {
            id: req.params.postId
        }
    })
        .then(vote => res.status(200).json(vote))
        .catch(err => res.json(req.errors))
})


// Delete Request //
router.delete('/:postId', (req, res) => {
    db.meme.destroy({
        where: {
            id: req.params.postId
        }
    })
        .then(vote => res.status(200).json(vote))
        .catch(err => res.status(500).json({
            error: err
        }))
});

module.exports = router;