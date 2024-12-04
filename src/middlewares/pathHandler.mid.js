function pathHandler(req, res, next) {
    const message = req.method + ' ' + req.url + "ENDPOINT NOT FOUND";
    const statusCode = 404;
    res.status(statusCode).json({ message });
}
export default pathHandler;
