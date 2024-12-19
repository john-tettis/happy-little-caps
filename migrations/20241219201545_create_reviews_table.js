/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reviews', table => {
        table.increments('id').primary();
        table.integer("hat_id").notNullable();
        table.foreign("hat_id").references("hats.id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.text("message").notNullable();
        table.integer("rating").notNullable();
        table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
