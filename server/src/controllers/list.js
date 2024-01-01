const list = async (req, res) => {
    const shipments = await req.Shipments.list();
    res.send(shipments);
}

module.exports = list;
