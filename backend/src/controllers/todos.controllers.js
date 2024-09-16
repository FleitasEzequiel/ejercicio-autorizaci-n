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
  if (database.todos[index].owner == req.user.id) {
    if (index != -1) {
      database.todos.splice(index, 1);
      res.send("Se eliminó la tarea");
    } else {
      res.send("No se encontró la tarea");
    }
  } else {
    res.send("No tiene acceso para hacer eso");
  }
};
export const editTodosCtrl = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const index = database.todos.findIndex((el) => el.id == id);
  //Si encuentra un título
  if (req.body.title) {
    if (index != -1) {
      if (database.todos[index].owner == req.user.id) {
        database.todos[index].title = req.body.title;
        res.send("Se ha modificado la tarea");
      } else {
        res.send("No se encontró la tarea");
      }
    }
  } else if (req.body.done !== undefined) {
    if (database.todos[index].owner == req.user.id) {
      if (index != -1) {
        database.todos[index].completed = req.body.done;
        res.send("Se ha modificado la tarea").status(200);
      } else {
        res.send("No se encontró la tarea").status(400);
      }
    }
  }
};

export const addTodosCtrl = (req, res) => {
  try {
    const idMax = Math.max(
      ...database.todos.map((el) => (el.owner == req.user.id ? el.id : null))
    );
    console.log(idMax);
    const datos = {
      title: req.body.title,
      owner: req.user.id,
      id: idMax + 1,
      completed: false,
    };
    database.todos.push(datos);
    res.send(datos);
  } catch (error) {
    console.log(error);
    res.send("Malió sal");
  }
};
