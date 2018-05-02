const { validationResult } = require('express-validator/check');


module.exports = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return res.send(400).send(validation.array())
    }

    next();
}