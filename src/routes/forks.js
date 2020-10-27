const router = require('express').Router();
const Controller = require('../controllers/forks');
const authenticate = require('../middleware/authenticateToken');

router.route('/')
    .get(authenticate, async(req, res, next) => {
        try {
            const result = await Controller.getForks(req.query.page, req.query.perPage);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    })
    .post(authenticate, async(req, res, next) => {
        try {
            const result = await Controller.createFork(req.body);
            res.status(200).send(result);
        } catch (err) {
            next(err);
        }
    });
router.route('/:id')
    .get(authenticate, async(req, res, next) => {
        try {
            if(!isNaN(req.params.id)) {
                const related = (req.query.related) ? req.query.related : 0;
                const result = await Controller.getFork(req.params.id, related);
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
                const result = await Controller.updateFork(req.params.id, req.body);
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
                const result = await Controller.deleteFork(req.params.id);
                res.status(200).send('Deleted');
            } else {
                throw ({ status: 404, message: 'invalid Id' })
            }
        } catch(err) {
            next(err);
        }
    });
module.exports = router;