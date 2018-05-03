const { errorResponse } = require('../utils/response');
const { compare } = require('../utils/token');
const _ = require('paretojs');

module.exports = (req, res, next) => {
    let token = req.headers['x-auth'];
    let tokenValid = _.compose(compare,removeBearerToken) 
    if (!token || !tokenValid) {
        return res.status(401).send(errorResponse('Não está autorizado'));
    }

    next();
}

const removeBearerToken = token => token.replace('Bearer ','');