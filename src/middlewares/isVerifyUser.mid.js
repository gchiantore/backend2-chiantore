import { readByEmail } from "../data/mongo/managers/users.manager.js"

async function isVerifyUser(req, res, next) {
    const { email } = req.body
    const one = await readByEmail(email)
    if (one) {
        return next()
    } else {
        const error = new Error("INVALID CREDENTIALS")
        error.statusCode = 401
        throw error
    }
}

export default isVerifyUser