const router = require('express').Router();
const db = require('../models');
const { error } = require('../utils/response');
const auth = require('../middlewares/auth');
const validatorMiddleware = require('../middlewares/validator');
const validator = require('../validator/holiday');

router.get('', async (req, res) => {
    let response = await db.sequelize.models.holidays.findAll().catch(err => error(err)(res));
    res.send(response);
});

router.get('/:id', async (req, res) => {
    let response = await db.sequelize.models.holidays.findById(req.params.id).catch(err => error(err)(res));
    res.send(response);
});

router.post('', auth, validator.create, validatorMiddleware, async (req, res) => {
    let {
        dateHoliday,
        description
    } = req.body;

    let response = await db.sequelize.models.holidays.create({
        dateHoliday,
        description
    }).catch(err => error(err)(res));

    res.send(response);
});

router.put('/:id', auth, validator.create, validatorMiddleware, async (req, res) => {
    let {
        dateHoliday,
        description
    } = req.body;

    let response = await db.sequelize.models.holidays.findById(req.params.id).catch(err => error(err)(res));
    if (response) {
        response.update({
            dateHoliday,
            description
        }).catch(err => error(err)(res));
    }

    res.send(response);
});

module.exports = router;