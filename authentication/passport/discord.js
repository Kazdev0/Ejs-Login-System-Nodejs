const passport = require("passport");
const User = require("../../models/User");
const DiscordStrategy = require("passport-discord").Strategy;
const refresh = require("passport-oauth2-refresh");


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (user) done(null, user);
  });
  
  const strat = new DiscordStrategy(
    {
      clientID:process.env.clientID,
      clientSecret:process.env.clientSecret,
      callbackURL: process.env.callbackURL,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ discordId: profile.id });
        if (user) {
          User.findOneAndUpdate(
            { discordId: profile.id },
            { guilds: profile.guilds, rtoken: refreshToken, atoken: accessToken },
  
            async (err) => {
              if (err) throw err;
              let newUser = await User.findOne({ discordId: profile.id });
              done(null, newUser);
            }
          );
        } else {
          const newUser = await User.create({
            discordId: profile.id,
            username: profile.username,
            discriminator:profile.discriminator,
            password:" "
          });
  
          const savedUser = await newUser.save();
  
          done(null, savedUser);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  );
  
  passport.use("discord", strat);
  refresh.use("discord", strat);