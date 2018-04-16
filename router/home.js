var express = require('express');
var router = express.Router();

// Route the homepage
router.get('/', ensureAuthenticated, function(req, res){
    res.render('home');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;