const destroy = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const deletedShipment = await req.Shipment.delete(Number(id));
    deletedShipment
        ? res.status(200).send(deletedShipment)
        : res.sendStatus(500).send({err: 'could not delete shipment'});
}

module.exports = destroy;