const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const passportSetup = require("passport");
const UserGoogle = require('../models/userGoogle');
const UserDiscord = require('../models/userDiscord');
const User = require("../models/user");

passportSetup.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/user/login/google/redirect",
        },
        (accessToken, refreshToken, profile, done) => {
            UserGoogle.findOne({googleId: profile.id}).then(async (currentUser) => {
                console.log(profile);
                if (currentUser) {
                    console.log("user is: ", currentUser)
                    done(null, currentUser);
                } else {
                    const user = await User.findOne({email: profile.emails[0].value});
                    const userDiscord = await UserDiscord.findOne({email: profile.emails[0].value});
                    if (user || userDiscord) {
                        done(null, false);
                    } else {
                        new UserGoogle({
                            username: profile.displayName,
                            googleId: profile.id,
                            email: profile.emails[0].value,
                        }).save().then((newUser) => {
                            console.log('new user created' + newUser);
                            done(null, newUser);
                        })
                    }

                }
            })
        }
    )
);

passportSetup.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: "/api/user/login/discord/redirect",
        },
        (accessToken, refreshToken, profile, done) => {
            UserDiscord.findOne({discordId: profile.id}).then(async (currentUser) => {
                if (currentUser) {
                    console.log("user is: ", currentUser)
                    done(null, currentUser);
                } else {
                    const user = await User.findOne({email: profile.email});
                    const userGoogle = await UserGoogle.findOne({email: profile.email});
                    if (user || userGoogle) {
                        done(null, false);
                    } else {
                        new UserDiscord({
                            username: profile.username,
                            discordId: profile.id,
                            email: profile.email,
                        }).save().then((newUser) => {
                            console.log('new user created' + newUser);
                            done(null, newUser);
                        })
                    }

                }
            })

            //done(null, profile);
        }
    )
);

passportSetup.serializeUser((user, done) => {
    done(null, user.id);
});

passportSetup.deserializeUser(async (id, done) => {
    try {
        const userGoogle = await UserGoogle.findById(id);
        if (userGoogle) {
            done(null, userGoogle);
            return;
        }

        const userDiscord = await UserDiscord.findById(id);
        done(null, userDiscord);
    } catch (error) {
        done(error, null);
    }
});
