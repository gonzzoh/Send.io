// A "seed" file is how we can pre-populate our database with data.
// This is useful for testing and development purposes.

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
    // Deletes ALL existing entries (you can just use knex and delete everything)
    await knex('shipments').del();
    // Now run your logic to create your resources with your models

    await knex.table('shipments').insert([
      { name: 'Tyler Durton', email: 'heavystuff@dawg.com', phone_number: 1234567890, load_weight: 9000, origin: "New Jersey", destinations: [{destination : 'New York'}, {destination : 'Los Angeles'}] },
    ])

  };