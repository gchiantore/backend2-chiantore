import jwt from "jsonwebtoken"

const { JWT_SECRET } = process.env;
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