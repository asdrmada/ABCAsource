module.exports = {
    isLoggedIn: function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error', 'logged in users only!');
        res.redirect('back');
    }
  }
};