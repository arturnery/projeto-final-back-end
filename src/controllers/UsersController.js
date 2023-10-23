const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { hash, compare } = require("bcryptjs")

class UsersController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const checkUserExist = await knex("users").where({ email }).first();

    if(checkUserExist){
      throw new AppError("Este email já está sendo usado. Tente outro email.")
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({ name, email, password: hashedPassword, isAdmin })

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("User não encontrado.");
    }

    if (email) {
      const userWithUpdatedEmail = await knex("users").where({ email }).first();
    
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Este email já está sendo usado. Tente outro email.");
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para informar a nova senha.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }
      user.password = await hash(password, 8);
    }

    await knex("users").where({ id }).update({ name: user.name, email: user.email, password: user.password });

    return response.json();
  }
}

module.exports = UsersController;