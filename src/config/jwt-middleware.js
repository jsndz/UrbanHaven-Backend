import passportJWT from 'passport-jwt';
import JWT_SECRET from '../config/jwt';
import User from '../models/User';
import e from 'express';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const optn ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

export const passportAuth = (passport) =>{
    try{passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
        console.log("req sent to strategy");
        const user = await User.findById(jwt_payload.id);
            if (!user) {
                return done(null, false);
            }
             else {
                return done(null, user);
                // or you could create a new account
            }
        }));}
        catch(err){
            console.log(err);
            throw err;  
        }
}
   
