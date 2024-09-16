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
  const id = req.params.id;
  console.log(id);
  const index = database.todos.findIndex((el) => el.id == id);
  //Si encuentra un título
  if (req.body.title){
    if (index != -1) {
      database.todos[index].title = req.body.title;
      res.send("Se ha modificado la tarea");
    } else {
      res.send("No se encontró la tarea");
    }
  }else if(req.body.done !== undefined){
    if (index != -1) {
      database.todos[index].completed = req.body.done;
      res.send("Se ha modificado la tarea").status(200);
    } else {
      res.send("No se encontró la tarea").status(400);
    }
  }}

export const addTodosCtrl = (req, res) => {
  try {
    console.log(req.user)
    const idMax = Math.max(...database.todos.map((el)=> (el.owner == req.user.id ? el : null)))
    console.log(idMax)
    database.todos.push({
      title: req.body.title,
      owner: req.user.id,
      id: idMax + 1,
      completed: false,
    });
    res.send("Se agregó la tarea");
  } catch (error) {
    console.log(error);
    res.send("Malió sal");
  }
};
