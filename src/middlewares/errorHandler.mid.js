function errorHandler(err, req, res, next) {
    console.log(err);
    const message = req.method + ' ' + req.url + ' ' + (err.message || "API ERROR") ;
    const status = err.status || 500;
    res.status(status).json( { message });
}

export default errorHandler;