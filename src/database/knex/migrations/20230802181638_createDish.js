exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.text("image");
  table.text("name");
  table.float("price");
  table.text("description");
  table.text("category");
  
  table.integer("user_id").references("id").inTable("users")
});
exports.down = knex => knex.schema.dropTable("dishes");
