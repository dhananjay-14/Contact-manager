const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
            res.json({ title: "ERROR 400: BAD REQUEST ", message: err.message, stackTrace: err.stack });
            break;
        case 404:
            res.json({ title: "ERROR 404: NOT FOUND ", message: err.message, stackTrace: err.stack });
            break;
        case 401:
            res.json({ title: "ERROR 401: Unauthorized ", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("no error, all good")
            break;
    }


}
module.exports = errorHandler;