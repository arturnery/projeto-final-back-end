const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create (request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError("Email e/ou senha incorreta", 401)
    }

    const { secret, expiresIn } = authConfig.jwt;
    const payload = {
      user_id: String(user.id),
      isAdmin: String(user.isAdmin),
    }
    const token = sign(payload, secret, {
      expiresIn
    })

    return response.json({ user, token });
  }
}

module.exports = SessionsController;