exports.up = function(knex, Promise) {
    return knex.schema.createTable('country', tbl => {
      tbl.increments();
  
      tbl
        .string('name', 255)
        .notNullable()
        .unique();
    });
  };
  
  exports.down = function(knex, Promise) {
    // undo the operation in up
    return knex.schema.dropTableIfExists('country');
  };
