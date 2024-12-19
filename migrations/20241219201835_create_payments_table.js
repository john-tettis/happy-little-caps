/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('payments', table => {
        table.increments('id').primary();
        table.integer("order_id").notNullable().references("id").inTable("orders");
        table.decimal('amount').notNullable();
        table.dateTime('payment_date').notNullable();
        table.string('payment_method').notNullable();
        table.string('payment_status').notNullable().defaultTo('Pending')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('payments');
};
