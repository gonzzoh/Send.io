/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('shipments', (table) => {
        table.increments();
        table.string('name');
        table.string('email'); 
        table.string('phone_number');
        table.string('load_weight'); 
        table.string('origin');
        table.string('destination');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('shipments');
};
