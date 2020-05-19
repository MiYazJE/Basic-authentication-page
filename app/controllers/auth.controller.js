const usersModel = require('../models/users.model');

const ONE_DAY = 60000 * 60 * 24;
const OPTS_COOKIE = {
    expire  : ONE_DAY,
    secure  : false,
    httpOnly: true
}

module.exports = {
    signUp,
    signIn,
    logOut,
    isLoggedIn,
    register: (req, res) => res.render('register'),
    login   : (req, res) => res.render('login'),
}

async function signUp(req, res) {
    const { name, password } = req.body;
    const user = new usersModel({ name, password });
    await user.save({ name, password });
    res.redirect('/login');
}

async function signIn(req, res) {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.render('login', { msg: 'Fields are empty' });
    }

    let msg = '';
    const user = await usersModel.findOne({ name });

    if (!user) {
        msg = 'User does not exists...';
    }
    else if (password === user.password) {
        res.cookie('user', user, OPTS_COOKIE);
        return res.redirect('/');
    }
    else {
        msg = `Password doesn't match!`;
    }

    res.render('login', { msg });
}

function logOut(req, res) {
    res.clearCookie('user');
    res.redirect('/login');
}

function isLoggedIn(req, res, next) {
    console.log(req.cookies.user);
    if (!req.cookies.user) {
        return res.redirect('/login');
    }
    next();
}