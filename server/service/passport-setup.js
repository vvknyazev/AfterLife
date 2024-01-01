const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require('passport-discord').Strategy;
const passportSetup = require("passport");
const UserGoogle = require('../models/userGoogle');
const UserDiscord = require('../models/userDiscord');
const User = require("../models/user");
const refresh = require('passport-oauth2-refresh');

const SOURCE_GOOGLE = 'google';
const SOURCE_DISCORD = 'discord';

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/user/login/" + SOURCE_GOOGLE + "/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
        singInCb(accessToken, refreshToken, profile, done, SOURCE_GOOGLE);
    }
)
const discordStrategy = new DiscordStrategy(
    {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: "/api/user/login/" + SOURCE_DISCORD + "/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
        singInCb(accessToken, refreshToken, profile, done, SOURCE_DISCORD);
    }
)
passportSetup.use(SOURCE_GOOGLE, googleStrategy);
passportSetup.use(SOURCE_DISCORD, discordStrategy);

refresh.use(googleStrategy);
refresh.use(discordStrategy);

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

let singInCb = function(accessToken, refreshToken, profile, done, source) {
    User.findOne({userId: profile.id, source: source}).then(async (currentUser) => {
        console.log(profile);
        if (currentUser) {
            console.log("user is: ", currentUser)
            done(null, currentUser);
        } else {
            const profileData = getProfileData(profile, source);
            const user = await User.findOne({email: profileData.email});
            if (user) {
                done(null, false);
            } else {
                new User({
                    username: profile.username,
                    email: profileData.email,
                    photo: profileData.imageUrl,
                    refreshToken: refreshToken,
                    userId: profile.id,
                    source: source,
                }).save().then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                })
            }

        }
    })
}

let getProfileData = function(profile, source) {
    let profileData = {
        imageUrl: '',
        email: '',
    };

    switch(source){
        case 'google':
            profileData.imageUrl = profile._json['picture'].replace("=s96-c", "");
            profileData.email = profile.emails[0].value;
            break;
        case 'discord':
            profileData.imageUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            profileData.email = profile.email;
            break;
        default:
            break;
    }

    return profileData;
}
