const knex = require("../database/knex");

class DishesController{
  async create(request, response) {
    const { name, price, description, category, ingredients } = request.body;
    const user_id = request.user.id;

    const [dish_id] = await knex("dishes").insert({
      name,
      price,
      description,
      category,
      user_id
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json(dish_id);
  }

  async update(request, response) {
    const { name, price, description, category, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new AppError("Alimento não encontrado.");
    }

    dish.name = name ?? dish.name;
    dish.price = price ?? dish.price;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    
    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id: id,
        name
      }
    })

    await knex("dishes").where({ id }).update({ name: dish.name, price: dish.price, description: dish.description, category: dish.category});

    await knex("ingredients").where({ dish_id: id }).delete();
    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return response.json({
      ...dish,
      ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  } 

  async index(request, response) {
    const { name } = request.query;
    
    let dishes;
    if(name) {
    
      const dishesByName = await knex('dishes')
      .whereLike('name', `%${name}%`)
      .orderBy('name');

      if(dishesByName.length == 0) {
        const dishesByIngredient = await knex('ingredients')
        .select('dishes.*')
        .where('ingredients.name', 'like', `%${name}%`)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .orderBy('dishes.name')
        .groupBy('dishes.id');

        dishes = dishesByIngredient
      } else {
        dishes = dishesByName
      }

    } else {
      dishes = await knex('dishes').orderBy('name')
    };
    return response.json(dishes)
  }
}

module.exports = DishesController;