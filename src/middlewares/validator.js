const { validationResult } = require('express-validator/check');
const { errorResponse } = require('../utils/response');

module.exports = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        res.status(400).send(errorResponse(validation.array()));
    }


    next();
}