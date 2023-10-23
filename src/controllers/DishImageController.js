const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImageController {
  async update(request, response) {
    const { dish_id }  = request.body;
    const user_id = request.user.id;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if(!user) {
      throw new AppError("Only authenticated admins can change image", 401);
    }

    const dish = await knex("dishes").where({ id: dish_id, user_id }).first();

    if(!dish) {
      throw new AppError("Food not found", 404);
    }

    if(dish.image) {
      await diskStorage.delete_file(dish.image);
    }

    const filename = await diskStorage.save_file(imageFilename);
    dish.image = filename;

    await knex("dishes").update(dish).where({ id: dish_id });

    return response.json(dish);
  }
}

module.exports = DishImageController