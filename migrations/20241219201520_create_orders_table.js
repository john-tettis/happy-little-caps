/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.integer('discount_code_id').unsigned().references('id').inTable('discount_codes');
        table.decimal('total').notNullable();
        table.decimal('subtotal').notNullable();
        table.text('name').notNullable();
        table.string('phone')
        table.string('email')
        table.text('status').notNullable().defaultTo('Pending')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  
};
