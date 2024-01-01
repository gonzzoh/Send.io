const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const logRoutes = require('./middleware/log-routes');
const shipmentRoutes = require("./routes");

const app = express();

/* ----------------------------- BodyParser/Cors ---------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

/* ------------------------------ Static Assets ----------------------------- */
const publicDir = path.join(__dirname, '../..', 'client/src');
const staticAssets = express.static(publicDir);
app.use(staticAssets);


/* --------------------------------- Routes --------------------------------- */
app.use(express.json());
app.use(logRoutes);
app.use(shipmentRoutes);


module.exports = app;