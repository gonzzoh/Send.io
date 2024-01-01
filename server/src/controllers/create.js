const create = async (req, res) => {
    console.log(req.body)
    const newShipment = await req.Shipments.create(req.body);
    newShipment 
    ? res.status(201).send(newShipment) 
    : res.sendStatus(500).send({err: 'could not create shipment'});
  };
  
  module.exports = create;