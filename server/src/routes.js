const express = require("express");
const shipmentsController = require("./controllers");
const addModels = require("./middleware/add-models");

const router = express.Router();

router.use(addModels);

router.get("/shipments", shipmentsController.list);
router.post("/shipments", shipmentsController.create);
router.get("/shipments/:id", shipmentsController.get);
router.delete("/shipments/:id", shipmentsController.destroy);

module.exports = router;