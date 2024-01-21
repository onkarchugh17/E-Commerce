import passport from "passport";

export function isAuth(req, res, next) {
   return passport.authenticate("jwt")
}

export const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

export const SECRET_KEY = "SECRET_KEY";

export const cookieExtractor = function(req){
    var token = null;
    if(req && req.cookies){
        token = req.cookies['jwt']
    }
    return token
}