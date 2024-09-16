import { Router } from "express";
import {
  deleteTodosCtrl,
  getAllTodosCtrl,
  editTodosCtrl,
  addTodosCtrl,
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.post("/delete/:id", validarJwt, deleteTodosCtrl);
todosRouter.put("/edit/:id", validarJwt, editTodosCtrl);
todosRouter.post("/add", validarJwt, addTodosCtrl);
export { todosRouter };
