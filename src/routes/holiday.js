const router = require('express').Router();
const db = require('../models');
const { error, errorResponse, dataResponse } = require('../utils/response');
const auth = require('../middlewares/auth');
const validatorMiddleware = require('../middlewares/validator');
const validator = require('../validator/holiday');
const moment = require('moment');

router.get('', async (req, res) => {
    let response = await db.sequelize.models.holidays.findAll().catch(err => error(err)(res));
    res.send(dataResponse(response));
});

router.get('/today', async (req, res) => {
    let response = await db.sequelize.models.holidays.findAll({
        where: {
            dateHoliday: moment().format('DD/MM/YYYY')
        }
    }).catch(err => error(err)(res));
    res.send(dataResponse(response));
});


router.get('/:id', async (req, res) => {
    let response = await db.sequelize.models.holidays.findById(req.params.id)
        .catch(err => error(err)(res));

    if (!response) {
        res.status(400).send(errorResponse('Holiday não encontrado'));
    }
    res.send(dataResponse(response));
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let response = await db.sequelize.models.holidays.findById(req.params.id)
            .catch(err => error(err)(res));

        response.destroy();
        res.send(dataResponse(response));
    } catch (e) {
        error(e)(res);
    }
});

router.post('', auth, validator.create, validatorMiddleware, async (req, res) => {
    let {
        dateHoliday,
        description
    } = req.body;

    let response = await db.sequelize.models.holidays.create({
        dateHoliday,
        description
    })
        .catch(err => error(err)(res));

    res.send(dataResponse(response));
});

router.put('/:id', auth, validator.create, validatorMiddleware, async (req, res) => {
    let {
        dateHoliday,
        description
    } = req.body;

    let response = await db.sequelize.models.holidays.findById(req.params.id)
        .catch(err => error(err)(res));

    if (response) {
        response.update({
            dateHoliday,
            description
        }).catch(err => error(err)(res));
    }

    res.send(dataResponse(response));
});

module.exports = router;