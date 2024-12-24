import CustomRouter from "../../utils/CustomRouter.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, signout, online, google, github, verify } from "../../controllers/sessions.controllers.js";




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
        this.read("/google", ['PUBLIC'], passportCb("google", { scope: ["profile", "login"] }))
        // /api/sessions/google/cb va a llamar efectivamente a la estrategia encargada de register/login con google
        this.read("/google/cb", ['PUBLIC'], passportCb("google"), google)
        this.read("/github", ['PUBLIC'], passportCb("github", { scope: ["profile", "login"] }))
        this.read("/github/gb", ['PUBLIC'], passportCb("github"), github)
        this.create("/verify", ['PUBLIC'], verify);
    }
}

let sessionsApiRouter = new AuthApiRouter();
sessionsApiRouter = sessionsApiRouter.getRouter();
export default sessionsApiRouter;
