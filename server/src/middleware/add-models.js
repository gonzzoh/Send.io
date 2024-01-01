const Shipments = require('../db/models/shipments');

const addModels = (req, res, next) => {
    req.Shipments = Shipments;
    next();
}

module.exports = addModels;