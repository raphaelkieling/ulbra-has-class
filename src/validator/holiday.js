const { check } = require('express-validator/check');

module.exports = {
    create: [
        check('dateHoliday').isString().matches(/\d{2}\/\d{2}\/\d{4}/),
        check('description').isString().isLength({ max: 30 })
    ]
}