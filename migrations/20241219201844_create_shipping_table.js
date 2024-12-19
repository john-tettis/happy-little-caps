/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('shipping', table => {
        table.increments('id').primary();
        table.integer("order_id").notNullable();
        table.foreign("order_id").references("orders.id");
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('zip').notNullable();
        table.string('country').notNullable();
        table.string('status').notNullable().defaultTo('Pending')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
