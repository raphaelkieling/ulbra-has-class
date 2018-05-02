const { errorObject } = require('../utils/response');
const { compare } = require('../utils/token');
const { maybe } = require('../utils/utils');
const _ = require('paretojs');

module.exports = (req, res, next) => {
    let token = req.headers['x-auth'];
    let tokenValid = _.compose(compare,removeBearerToken) 
    if (!token || !tokenValid) {
        res.status(401).send(errorObject('Não está autorizado'));
        return;
    }

    next();
}

const removeBearerToken = token => token.replace('Bearer ','');