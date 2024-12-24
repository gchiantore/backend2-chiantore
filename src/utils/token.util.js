import jwt from "jsonwebtoken"
import envUtil from "./env.util.js";

const { JWT_SECRET } = envUtil;
function createTokenUtil(data) {
    const token = jwt.sign(
        data, 
        JWT_SECRET,
        { expiresIn: 60 * 60 * 24 * 7 }
    )
    return token
}

function finishTokenUtil(data) {
    const token = jwt.sign(
        data,
        SECRET_KEY,
        { expiresIn: 1 }
    )
    return token
}

function verifyTokenUtil(token) {
    const verifyData = jwt.verify(token, JWT_SECRET)
    return verifyData
}

export { createTokenUtil, verifyTokenUtil, finishTokenUtil } 