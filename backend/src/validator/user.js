const { check } = require('express-validator/check');

module.exports = {
    create: [
        check('username').isString().isLength({ min: 1 }),
        check('password').isString().isLength({ min: 1 })
    ],
    update: [
        check('username').isString().isLength({ min: 1 }),
        check('password').isString().isLength({ min: 1 })
    ]
}