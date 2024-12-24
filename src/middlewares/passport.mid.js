import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { Strategy as GitHubStrategy } from "passport-github2"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { create, readByEmail, readById, readPaginate,update } from "../dao/mongo/managers/users.manager.js"
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js"
import { createTokenUtil,verifyTokenUtil,finishTokenUtil } from "../utils/token.util.js"
import envUtil from "../utils/env.util.js";
import { sendVeryfyEmail } from "../utils/nodemailer.util.js";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK } = envUtil
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK } = envUtil
const { JWT_SECRET, SECRET_KEY } = envUtil

passport.use("register", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const one = await readByEmail(email)
            if (one) {
                const info= {
                    message: "User already exists",
                    statusCode: 401}
                return done(null, false, info)    
            }
            req.body.password = createHashUtil(password)
            let data = req.body
            data.emailMkt = email
            data.verifyCode= Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
            const user = await create(data)
            await sendVeryfyEmail(email, data.verifyCode)
            return done(null, user)
        } catch (error) {
            return done(error)
        }

    }
))
passport.use("login", new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
        try {
            const user = await readByEmail(email)
            if (!user) {
                const info= {
                    message: "USER NOT FOUND",
                    statusCode: 401}
                return done(null, false, info)    
            }
            if (!user.verifyUser) {
                const info= {message: "USER NOT VERIFIED, VERIFY YOUR ACCOUNT"}
                return done(null, false, info)
            }
            const dbPassword = user.password
            const verify = verifyHashUtil(password, dbPassword)
            if (!verify) {
                const info= {
                    message: "INVALID CREDENTIALS",
                    statusCode: 401}
                return done(null, false, info)
            }
            const tknData = {
                user_id: user._id,
                role: user.role
            }
            const token = createTokenUtil(tknData)
            user.token = token
            await update(user._id, { isOnline: true });
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))
passport.use("signout", new JwtStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]), secretOrKey: JWT_SECRET},
    async (data, done) => {
        try {
            const { user_id } = data
            await update( user_id , { isOnline: false }); 
            console.log(user_id);
            return done(null, { user_id: null })
        } catch (error) {
            return done(error)
        }
    })
)
passport.use("online", new JwtStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]), secretOrKey: JWT_SECRET},
    async (data, done) => {
        try {
            const { user_id } = data
            const user = await readById(user_id)
            const { isOnline } = user
            if(!isOnline) {
                const info= {
                    message: "USER NOT ONLINE",
                    statusCode: 401}
                return done(null, false, info)    
                
            }
            console.log(user);
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })
)
passport.use("admin", new JwtStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]), secretOrKey: JWT_SECRET},
    async (data, done) => {
        try {
            const {user_id, role} = data;
            if(role !== "ADMIN") {
                const info= {
                    message: "USER NOT AUTHORIZED",
                    statusCode: 403}
                return done(null, false, info)
            }
            const user = await readById(user_id)
            user.password = null; // como el password vienen de la base de datos, elimino la version que esta en sesion por seguriad, total queda en la DB
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })
)
passport.use("google", new GoogleStrategy(
    { clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, passReqToCallback: true, callbackURL: GOOGLE_CALLBACK },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            // desestructuro de los datos de google el id del usuario y su foto/avatar
            console.log(profile);
            const { id, picture, email, displayName } = profile
            // como estrategia de terceros NO SE SUELE registrar al usuario por su email sino por su identificador en la base del tercero
            // esto es debido a que si utilizo el email, SI O SI necesito la contraseña y la contraseña NO LA ENVIA NINGUN TERCERO (google)
            let user = await readByEmail(id)
            // si el usuario no es parte de la base de datos
            if (!user) {
                // lo crea/registra
                const data = {
                    email: id,
                    emailMkt: email,
                    avatar: picture,
                    name: displayName,
                    password: createHashUtil(id)
                }
                user = await create(data)
            }
            req.token = createTokenUtil({ user_id: user._id, role: user.role })
            // y luego inicia sesión "automaticamente"
            //req.session.role = user.role
            //req.session.user_id = user._id
            // este done() agrega al objeto de requerimientos el objeto user con los datos del register/login user
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))
passport.use("github", new GitHubStrategy(
    { clientID: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET, passReqToCallback: true, callbackURL: GITHUB_CALLBACK },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await readByEmail(profile._json.login)
            if (!user) {
                const data = {
                    email: profile._json.login,
                    emailMkt: profile._json.login,
                    avatar: profile._json.avatar_url,
                    name: profile._json.login,
                    password: createHashUtil(profile._json.login)
                }
                user = await create(data)
            }
            req.token = createTokenUtil({ user_id: user._id, role: user.role })
            //req.session.role = user.role
            //req.session.user_id = user._id
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

export default passport