/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.string('type').notNullable();
        table.integer("quantity").notNullable();
        table.string("description").notNullable();
        table.string('primary_color').notNullable();
        table.string('material').notNullable();
        table.decimal('price').notNullable();
        table.string('image_url').notNullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
