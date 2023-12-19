const { Router } = require('express');

const contactController = require('./app/controlers/contactController')
const categorycontroller = require('./app/controlers/categorycontroller');

const router = Router();

router.get('/contacts',contactController.index);
router.get('/contacts/:id', contactController.show)
router.delete('/contacts/:id', contactController.delete)
router.post('/contacts', contactController.store)
router.put('/contacts/:id', contactController.update)

router.get('/categories', categorycontroller.index)
router.post('/categories', categorycontroller.store)


module.exports = router;
