const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated){
        return next();
    } else {
        res.redirect(back),
        alert("only logged in users!");
    }
};

module.exports = middlewareObj;