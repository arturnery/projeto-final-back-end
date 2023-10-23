
exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.text("name");
  table.text("email");
  table.text("password");
  table.integer("isAdmin").defaultTo(0).notNullable();
});


exports.down = knex => knex.schema.dropTable("users");
