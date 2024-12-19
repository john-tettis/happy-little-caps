/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order_items', table => {
        table.increments('id').primary();
        table.integer("order_id").notNullable();
        table.foreign("order_id").references("orders.id");
        table.integer("hat_id").notNullable();
        table.foreign("hat_id").references("hats.id");
        table.integer("quantity").notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
