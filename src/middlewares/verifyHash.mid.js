import { verifyHashUtil } from "../utils/hash.util.js";
import { readByEmail } from "../data/mongo/managers/users.manager.js";

async function verifyHashMid(req, res, next) {
    const { password, email } = req.body;
    const user = await readByEmail(email);
    const verify = verifyHashUtil(password, user.password);
    if (verify) {
        return next();
    } else {
        const error = new Error("INVALID CREDENTIALS");
        error.statusCode = 401;
        throw error
    }
}

export default verifyHashMid;