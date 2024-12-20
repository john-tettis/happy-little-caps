/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order_items', table => {
        table.increments('id').primary();
        table.integer("order_id").notNullable().references("id").inTable("orders");
        table.integer("product_id").notNullable().references("id").inTable("products");
        table.integer("quantity").notNullable();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('order_items');
};
