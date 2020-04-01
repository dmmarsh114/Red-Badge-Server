const jwt = require('jsonwebtoken'); // constant json web token - require params
const db = require('../db'); //constant user - require database file importing

const validateSession = (req, res, next) => { // constant validateSession - request, response, next params
    if (req.method == 'OPTIONS') {
        next();
    } else {
        const token = req.headers.authorization;    // constant token - request headers info will be authorization

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { //json web token verified, it shows how it will be formatted
            if (!err && decoded) { // if no error then decode
                db.user.findOne({ //
                    where: {
                        id: decoded.id
                    }
                }, console.log(decoded))
                    .then(user => {
                        if (!user) throw 'err'; // if not user, throw an error
                        req.user = user;  // request user
                        return next();
                    })
                    .catch(err => next(err))
            } else {
                req.errors = err
                return res.status(500).send('Not authorized') // not authorized to log in 
            }
        })
    }
}

module.exports = validateSession;