const get = async (req, res) => {
    const { id } = req.params;
    const shipment = await req.Shipments.get(id);
    res.status(200).send(shipment);
}

module.exports = get;