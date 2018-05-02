const { errorObject } = require('../utils/response');
const { compare } = require('../utils/token');
const { maybe } = require('../utils/utils');

module.exports = (req, res, next) => {
    let token = req.headers['x-auth'];
    
    if (!token || !compare(removeBearerToken(token))) {
        res.status(401).send(errorObject('Não está autorizado'));
        return;
    }

    next();
}

const removeBearerToken = token => token.replace('Bearer ','');