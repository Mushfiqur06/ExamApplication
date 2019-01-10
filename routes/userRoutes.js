const router = require('express').Router();
const { register, activeAccount, getAllUsers } =require('../controllers/userController');

router.post('/register', register);
router.get('/activateaccount/:token', activeAccount);
router.get('/all', getAllUsers)

module.exports = router;
