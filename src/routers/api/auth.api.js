import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { response } from "express";
import { update } from "../../data/mongo/managers/users.manager.js";



class AuthApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/register",["PUBLIC"], passportCb("register"), register);
        this.create("/login", ["PUBLIC"], passportCb("login"), login);
        this.create("/signout", ["USER", "ADMIN"], signout);
        this.create("/online", ["USER", "ADMIN"], online);
        // /api/sessions/google va a llamar a la pantalla de consentimento y sel encarga de autenticar en google
        this.read("/google", ['PUBLIC'], passportCb("google", { scope: ["profile", "email"] }))
        // /api/sessions/google/cb va a llamar efectivamente a la estrategia encargada de register/login con google
        this.read("/google/cb", ['PUBLIC'], passportCb("google"), google)
        this.read("/github", ['PUBLIC'], passportCb("github", { scope: ["profile", "login"] }))
        this.read("/github/gb", ['PUBLIC'], passportCb("github"), github)
    }
}

let authRouter = new AuthApiRouter();
authRouter = authRouter.getRouter();
export default authRouter;

async function register(req, res, next) {
    const { _id } = req.user;
    const message = "USER REGISTERED !!";
    return res.json201(_id, message);
};

async function login(req, res, next) {
    const { token } = req.user
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
    const message = "USER LOGGED IN !!";
    return res
        .cookie("token", token, opts)
        .json200(response, message);
}


async function signout(req, res, next) {
    const { user_id } = req.user
    await update( user_id , { isOnline: false }); 
    const message = "USER LOGGED OUT !!";
    const response = "OK"
    res.clearCookie("token").json200(response, message);
}

function google(req, res, next) {
    return res.status(201).json({ message: "USER LOGGUED IN", token: req.token });
}

function github(req, res, next) {
    return res.status(201).json({ message: "USER LOGGUED IN", token: req.token });
}

async function online(req, res, next) {
    return res.status(200).json({
        message: req.user.email.toUpperCase() + " IS ONLINE",
        online: true,
    });
}