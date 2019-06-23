exports.up = function(knex, Promise) {
    return knex.schema.createTable('country', tbl => {
      tbl.increments();
  
      tbl
        .string('country', 255)
        .notNullable();

      tbl
        .unique('country');
    });
  };
  
  exports.down = function(knex, Promise) {
    // undo the operation in up
    return knex.schema.dropTableIfExists('country');
  };
