import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "../model/user.js";
import bcrypt from "bcrypt";
import { cookieExtractor, sanitizeUser } from "../services/common.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { SECRET_KEY } from "../services/common.js";
import jwt from "jsonwebtoken";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email });
        console.log("User is", user);
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        } else {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            return done(null, {
              id: user.id,
              role: user.role,
              token,
              orders: user.orders,
              addresses: user.addresses,
              email: user.email,
            });
          } else {
            return done(null, false, { message: "Invalid credentials" });
          }
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await Users.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {}
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, sanitizeUser(user));
  } catch (error) {
    console.log("Error");
    done(error);
  }
});
