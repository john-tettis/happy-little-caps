/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('hats', table => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.integer("quantity").notNullable();
        table.string('primary_color').notNullable();
        table.string('material').notNullable();
        table.integer('brim_size').notNullable();
        table.integer('height').notNullable();
        table.decimal('price').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('hats');
};
