const jwt = require('jsonwebtoken');
const SECRET = 'mynameisdie'

exports.create = data => {
    return jwt.sign({ data }, SECRET);
}

exports.compare = token => {
    try{
        return jwt.verify(token, SECRET); 
    }
    catch(e){
        return false;
    }
}