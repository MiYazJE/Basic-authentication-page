const express = require('express');
const router  = express.Router(); 

const usersCtrl = require('../controllers/users.controller');
const authCtrl  = require('../controllers/auth.controller');

router.get('/',       authCtrl.isLoggedIn, usersCtrl.home);
router.get('/users/', usersCtrl.get);

router.post('/register', authCtrl.signUp);
router.post('/login',    authCtrl.signIn);
router.get( '/logout',   authCtrl.logOut);

// If the user is already logged in, it will redirect to home
// otherwise it will continue to the next routes
router.use((req, res, next) => {
    if (req.cookies.user) {
        return res.redirect('/');
    }
    next();
});

router.get('/login',    authCtrl.login);
router.get('/register', authCtrl.register);

module.exports = router;