const router = require('express').Router();
const db = require('../models');
const { error, errorObject } = require('../utils/response');

const token = require('../utils/token');
const auth = require('../middlewares/auth');
const validator = require('../validator/user');
const validatorMiddleware = require('../middlewares/validator');

router.get('', auth, async (req, res) => {
    let response = await db.sequelize.models.user.findAll().catch(err => error(err)(res));
    res.send(response);
});

router.get('/:id', auth, async (req, res) => {
    let response = await db.sequelize.models.user.findById(req.params.id).catch(err => error(err)(res));

    if (!response) {
        return res.status(400).send(errorObject('Usuário não encontrado'));
    }
    res.send(response);
});

router.post('/auth', validator.create, validatorMiddleware, async (req, res) => {
    try {

        let { username, password } = req.body;
        let data = await db.sequelize.models.user.find({
            where: {
                username,
                password
            }
        }).catch(err => error(err)(res));

        if (!data) {
            res.status(401).send(errorObject('Nome ou senha não autorizados'));
        }

        res.send({
            token: token.create(data),
            data
        });

    } catch (e) {
        res.status(500).send(errorObject(e))
    }
});


router.post('/register', async (req, res) => {

    let { username, password } = req.body;
    let response = await db.sequelize.models.user.create({
        username,
        password
    })
        .catch(err => error(err)(res));

    res.send(response);
});

module.exports = router; 