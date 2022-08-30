const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            //Match user
            User.findOne({email: email})
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: 'That email is not registered'})
                    }

                    //Match password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, {message: 'Incorrect password'})
                        }
                    })
                })
                .catch(error => console.log(error))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
}