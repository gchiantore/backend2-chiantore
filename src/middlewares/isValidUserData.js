function isValidUserData(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = new Error("Required Fields Missing...");
        error.statusCode = 401;
        throw error // usamos throw para lanzar el error
    }
    return next();
}

export default isValidUserData;