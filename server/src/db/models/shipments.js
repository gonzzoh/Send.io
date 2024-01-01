const knex = require('./knex');

class Shipments {
  static async create(body) {
    try {
      const { name, email, loadWeight, origin, destination } = body;
      console.log("Inside try block", name, email, loadWeight, origin, destination);
      const query = `INSERT INTO truck_shipments (name, email, loadWeight, origin, destination) VALUES (?, ?, ?, ?, ?) RETURNING *`;
      const res = await knex.raw(query, [name, email, loadWeight, origin, destination]);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async delete(id) {
    try {
      const query = `DELETE FROM truck_shipments WHERE id = ? RETURNING *`;
      const res = await knex.raw(query, [id]);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async list() {
    try {
      const query = `SELECT * FROM truck_shipments`;
      const  res  = await knex.raw(query);
      return res.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Shipments;