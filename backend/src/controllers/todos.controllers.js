import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const todos = database.todos.filter((el) => {
    if (el.owner == req.user.id) {
      return el;
    }
  });
  res.json({ todos });
};

export const deleteTodosCtrl = (req, res) => {
  const id = req.params.id;
  const index = database.todos.findIndex((el) => el.id == id);
  if (index != -1) {
    database.todos.splice(index, 1);
    res.send("Se eliminó la tarea");
  } else {
    res.send("No se encontró la tarea");
  }
};
export const editTodosCtrl = (req, res) => {
  console.log("hola", req.body);
  const id = req.params.id;
  console.log(id);
  console.log(req.body.title);
  const index = database.todos.findIndex((el) => el.id == id);
  if (index != -1) {
    database.todos[index].title = req.body.title;
    res.send("Si se encontró");
  } else {
    res.send("No se encontró la tarea");
  }
};
export const addTodosCtrl = (req, res) => {
  try {
    index = database.todos.push({
      title: req.body.title,
      owner: req.user.id,
      id: 2,
      completed: false,
    });
    res.send("Se agregó la tarea");
  } catch (error) {
    console.log(error);
    res.send("Malió sal");
  }
};
