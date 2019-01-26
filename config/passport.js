const localStragety = require('passport-local').Strategy;
      mongoose      = require('mongoose');
      bodyparser    = require('body-parser');
      bcrypt        = require('bcrypt-nodejs');

const User          = require('../models/user');

module.exports = function(passport){
    passport.use(new localStragety ({usernameField : 'username'}, (username, password, done) => {
            User.findOne({username : username})
             .then(user => {
                if(!user){
                    return done (null, false, {message : "That username is not registered"});
                }

                bcrypt.compare(password, user.password, (err, isMatched) => {
                    if(err) throw err;

                    if(isMatched) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message : 'Password incorrect'});
                    }
                });
             })
             .catch(err => console.log(err));
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });     
}