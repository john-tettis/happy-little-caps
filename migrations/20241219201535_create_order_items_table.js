/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order_items', table => {
        table.increments('id').primary();
        table.integer("order_id").notNullable().references("id").inTable("orders");
        table.integer("hat_id").notNullable().references("id").inTable("hats");
        table.integer("quantity").notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('items');
};
