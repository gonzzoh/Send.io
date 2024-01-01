const logRoutes = (req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
}

module.exports = logRoutes;