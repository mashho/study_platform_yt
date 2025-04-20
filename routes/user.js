const express = require('express');
const AuthControllers = require('../controllers/user');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/signUp',AuthControllers.signUp);
router.post('/login',AuthControllers.signIn);
router.post('/logout',auth,AuthControllers.logout)

router.get('/me', auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;