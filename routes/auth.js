const express = require("express"),
      router = express.Router(),
      bodyparser = require('body-parser'),
      bcrypt = require('bcrypt-nodejs'),
      { isLoggedIn } = require('../config/index'),
      passport = require('passport'),
      User = require("../models/user");


router.get("/login", (req, res) => res.render("auth/login"));

router.get("/register", (req, res) => res.render("auth/register"));

// Registration handle
router.post("/register", (req, res) => {
            let username = req.body.username,
                password = req.body.password;

            // Check if username is already registered
            User.findOne({
                    username: username
                })
                .then(user => {
                        if (user) {
                            req.flash('error_msg', 'User already exists!!');
                            res.redirect('back');                           
                            console.log('User already exists, we ain\'t makin that, no sir.');
                        } else {

                            const newUser = {
                                username: username,
                                password: password
                            };
                            console.log(newUser);

                            // Password Encryption
                            bcrypt.genSalt(10, (err, salt) =>
                                bcrypt.hash(newUser.password, salt, null, (err, hash) => {
                                    if (err) throw err;
                                    
                                    newUser.password = hash;

                                    User.create(newUser, (err, newlyCreated) => {
                                        if (err) {
                                            req.flash('error_msg', 'An error has occurred!.....oh dear');
                                            res.redirect(back);
                                            console.log(err);
                                        } else {
                                            req.flash('success_msg', 'You are now registered!');
                                            res.redirect("login");                                       
                                            console.log(newUser);
                                            console.log("User succsesfully created!");
                                        }
                                    });
                                }));
                            }
                        });
                });

// Login handle
router.post("/login", (req, res, next) => {

    passport.authenticate('local', {
         successFlash: true,
         successRedirect: '/',
         failureFlash: true,
         failureRedirect: '/login'
    }
    )(req, res, next);
});

// Logout handle
router.get("/logout", (req, res) => {
    req.logout()
    req.flash('success_msg', 'You have been logged out!, Bye now!')
    res.redirect('/')
})

        module.exports = router;