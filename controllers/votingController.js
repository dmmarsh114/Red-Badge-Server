const express = require('express');
const router = express.Router();
const db = require("../db");

// Put Request //
router.put('/:postId', (req, res) => {
    db.memes.update(req.body, {
        where: {
            id: req.params.postId
        }
    })
        .then(vote => res.status(200).json(vote))
        .catch(err => res.json(req.errors))
})


// Delete Request //
router.delete('/:postId', (req, res) => {
    db.memes.destroy({
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