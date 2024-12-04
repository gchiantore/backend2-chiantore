import { readByEmail } from "../data/mongo/managers/users.manager.js";

async function isUser(req, res, next) {
    const { email } = req.body;
    const one = await readByEmail(email);
    console.log(one);
    if (one) {
        const error = new Error("User already exist");
        error.statusCode = 400;
        throw error // usamos throw para lanzar el error  
    }
    return next();
};

export default isUser;