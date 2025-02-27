import passport from 'passport'
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from '../model/userModel.js';


passport.use(new GoogleStrategy(
    {
        clientID: process.env.Google_Client_ID,
        clientSecret: process.env.Google_Client_Secret,
        callbackURL: `http://localhost:${process.env.PORT}/auth/login/google/callback`,
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        const email = profile?.emails?.[0]?.value;
        const name = profile?.displayName;
        const provider = profile?.provider


        if (!email || !name) {
            return done(new Error("Profile does not contain email or name"), null);
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                name,
                authProvider: provider,
            });
        } else {
            await user.save();
        }

        return done(null, user);
    }
)
);


export default passport.initialize();
