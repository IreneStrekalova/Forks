const router = require('express').Router();
const Controller = require('../controllers/usersCategories');
const authenticate = require('../middleware/authenticateToken');

router.route('/')
    .get(authenticate, async (req, res, next) => {
        try {
            const result = await Controller.getUsersCategories(req.query.page, req.query.perPage);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    })
    .post(authenticate, async(req, res, next) => {
        try {
            const result = await Controller.createUserCategory(req.body);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    });
router.route('/:id')
    .get(authenticate, async(req, res, next) => {
        try {
            if(!isNaN(req.params.id)) {
                const result = await Controller.getUserCategory(req.params.id);
                res.status(200).send(result);
            } else {
                throw ({ status: 404, message: 'invalid Id' })
            }
        } catch (err) {
            next(err);
        }
    })
    .put(authenticate, async (req, res, next) => {
        try {
            if(!isNaN(req.params.id)) {
                const result = await Controller.updateUserCategory(req.params.id, req.body);
                res.status(200).send(result);
            } else {
                throw ({ status: 404, message: 'invalid Id' })
            }
        } catch (err) {
            next(err);
        }
    })
    .delete(authenticate, async (req, res, next) => {
        try {
            if(!isNaN(req.params.id)) {
                const result = await Controller.deleteUserCategory(req.params.id);
                res.status(200).send('Deleted');
            } else {
                throw ({ status: 404, message: 'invalid Id' })
            }
        } catch(err) {
            next(err);
        }
    });

module.exports = router;