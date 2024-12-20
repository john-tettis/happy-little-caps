/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('discount_codes', table => {
        table.increments('id').primary();
        table.string('code').notNullable().unique();
        table.string('type').notNullable();
        table.decimal('amount').notNullable();
        table.dateTime('valid_from').notNullable();
        table.dateTime('valid_to').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('discount_codes');
};
