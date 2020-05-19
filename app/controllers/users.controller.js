const usersModel = require('../models/users.model');

module.exports = {
    home,
    get : async (req, res) => res.json(await usersModel.find({ })),
}

function home(req, res) {
    const { user } = req.cookies;
    res.render('home', { user });
}