
function logRequest(req, res, next) {
    const method = req.method;
    const url = req.originalUrl || req.url;

    console.log(`Request Method: ${method}, URL: ${url}`);
    next();
}
module.exports = logRequest;