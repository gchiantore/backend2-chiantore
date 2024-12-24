import { updateService, verifyService } from "../services/auth.services.js";



async function register(req, res, next) {
    const { _id } = req.user;
    const message = "USER REGISTERED !!";
    return res.json201(_id, message);
};

async function login(req, res, next) {
    const { token } = req.user
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true }
    const message = "USER LOGGED IN !!";
    const response = req.user.email
    return res
        .cookie("token", token, opts)
        .json200(response, message);
}


async function signout(req, res, next) {
    const { user_id } = req.user
    await updateService( user_id , { isOnline: false }); 
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

async function verify(req, res, next) {
    const { email, verifyCodeFromUser } = req.body;
    const response=await verifyService(email, verifyCodeFromUser)
    if (response) {
        const message = "USER VERIFIED"
        return res. json200("OK", message)
    }else {
        return res.json404()
    }
}


export { register, login, signout, google, github, online, verify };