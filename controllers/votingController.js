const express = require('express');
const router = express.Router();
const Vote = require("../db").import('../models/memes')

// Put Request //
router.put('/:postId', (req, res) => {
    Vote.update(req.body, {
            where: {
                id: req.params.postId
            }
        })
        .then(vote => res.status(200).json(vote))
        .catch(err => res.json(req.errors))
})


// Delete Request //
router.delete('/:postId', (req, res) => {
    Vote.destroy({
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