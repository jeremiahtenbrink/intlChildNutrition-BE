exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", tbl => {
    tbl.increments();
    tbl
      .string("username", 128)
      .notNullable()
      .unique();

    tbl
      .string("password", 128)
      .notNullable()

    tbl.boolean("isAdmin")
      .default(false);

    tbl.integer("country_id")
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('country')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user");
};
