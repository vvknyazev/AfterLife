const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passportSetup = require("passport");
const UserGoogle = require('../models/userGoogle');

passportSetup.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/user/login/google/redirect",
        },
        (accessToken, refreshToken, profile, done) => {
            UserGoogle.findOne({googleId: profile.id}).then((currentUser) => {
                if (currentUser){
                    console.log("refreshToken: ", refreshToken);
                    console.log("accessToken: ", accessToken);
                    console.log("user is: ", currentUser)
                    done(null, currentUser);
                }else{
                    console.log("refreshToken: ", refreshToken);
                    console.log("accessToken: ", accessToken);
                    new UserGoogle({
                        username: profile.displayName,
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        refreshToken: refreshToken,
                    }).save().then((newUser)=>{
                        console.log('new user created' + newUser);
                        done(null, newUser);
                    })
                }
            })

            //done(null, profile);
        }
    )
);

passportSetup.serializeUser((user, done) => {
    done(null, user.id);
});

passportSetup.deserializeUser((id, done) => {
    UserGoogle.findById(id).then((user)=>{
        done(null, user);
    })
});
