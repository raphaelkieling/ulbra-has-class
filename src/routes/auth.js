const router = require('express').Router();
const db = require('../models');
const { error, errorResponse, dataResponse } = require('../utils/response');

const token = require('../utils/token');
const auth = require('../middlewares/auth');
const validator = require('../validator/user');
const validatorMiddleware = require('../middlewares/validator');
const md5 = require('md5');

router.get('', auth, async (req, res) => {
    let response = await db.sequelize.models.user.findAll().catch(err => error(err)(res));
    res.send(dataResponse(response));
});

router.get('/:id', auth, async (req, res) => {
    let response = await db.sequelize.models.user.findById(req.params.id).catch(err => error(err)(res));

    if (!response) {
        return res.status(400).send(errorResponse('Usuário não encontrado'));
    }
    res.send(dataResponse(response));
});

router.post('/auth', validator.create, validatorMiddleware, async (req, res) => {
    try {
        let { username, password } = req.body;
        let user = await db.sequelize.models.user.findOne({
            where: {
                username,
                password: md5(password)
            }
        }).catch(err => error(err)(res));

        if (!user) {
            res.status(401).send(errorResponse('Nome ou senha não autorizados'));
        }

        res.send(dataResponse({
            token: token.create(user),
            user
        }))

    } catch (e) {
        error(e)(res);
    }
});


router.post('/register', validator.create, validatorMiddleware, async (req, res) => {

    let { username, password } = req.body;
    let response = await db.sequelize.models.user.create({
        username,
        password: md5(password)
    })
        .catch(err => error(err)(res));

    res.send(dataResponse(response));
});

module.exports = router; 