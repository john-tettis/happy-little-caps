/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('gallery', table => {
        table.increments('id').primary();
        table.text("image_url").notNullable();
        table.text("description").notNullable();
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('gallery');
};
