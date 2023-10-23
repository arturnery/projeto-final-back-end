const { verify } = require("jsonwebtoken"); 
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth"); 

function verifyIsAdmin(request, response, next) { 
  const authHeader = request.headers.authorization; 

  if(!authHeader){ 
    throw new AppError("JWT Token uninformed", 401);
  }

  const [, token] = authHeader.split(" ");

  try{
    const { isAdmin } = verify(token, authConfig.jwt.secret);

    if(isAdmin == 0) {
      throw new AppError("User is not admin", 401);
    }

    if(isAdmin == 1) {
      return next();
    }

  } catch {
    throw new AppError("User is not admin", 401);
  }
}

module.exports = verifyIsAdmin;