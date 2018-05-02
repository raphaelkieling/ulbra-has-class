const router = require('express').Router();
const db = require('../models');
const { error } = require('../utils/response');
const auth = require('../middlewares/auth');

router.get('',  async (req, res) => {
    let response = await db.sequelize.models.holidays.findAll().catch(err => error(err)(res));
    res.send(response);
});

router.get('/:id', async (req, res) => {
    let response = await db.sequelize.models.holidays.findById(req.params.id).catch(err => error(err)(res));
    res.send(response);
});

router.post('', auth, async (req, res) => {
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

router.put('/:id', auth, async (req, res) => {
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