const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const DishesController = require("../controllers/DishesController");
const DishImageController = require("../controllers/DishImageController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const verifyIsAdmin = require("../middlewares/verifyIsAdmin");

const dishesRouter = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishImageController = new DishImageController();

dishesRouter.use(ensureAuthenticated);

dishesRouter.post("/", verifyIsAdmin, dishesController.create);
dishesRouter.put("/:id", verifyIsAdmin, dishesController.update);
dishesRouter.get("/:id", dishesController.show);
dishesRouter.delete("/:id", dishesController.delete);
dishesRouter.get("/", dishesController.index);
dishesRouter.patch("/", verifyIsAdmin, upload.single("image"), dishImageController.update)

module.exports = dishesRouter;
