/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('truck_shipments', (table) => {
        table.increments();
        table.string('name');
        table.string('email'); 
        table.integer('phoneNumber'); 
        table.integer('loadWeight');
        table.string('origin');
        table.string('destination');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('truck_shipments');
};
