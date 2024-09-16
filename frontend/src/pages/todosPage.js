import Swal from "sweetalert2"
import { tarjeta } from "../components/tarjeta";
export const todosPage = () => {

  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-full",
    "bg-gray-200",
  );
  const $Agregar = document.createElement("div")
  $Agregar.classList.add("bg-slate-200","z-10","justify-center","fixed","right-10","flex","text-center","bottom-10","h-10","w-40","rounded-lg","text-2xl","shadow-md","border-2","border-black")
  const $botonAgregar = document.createElement("button")
  $botonAgregar.textContent = "Add"


  $Agregar.appendChild($botonAgregar)
  // $Agregar.appendChild($iconoAgregar)
  $botonAgregar.addEventListener("click",()=>{
    Swal.fire({
      title: 'Add ToDo',
      input: "text",
      inputLabel:"Title:",
      showCancelButton: true,
      confirmButtonText: 'Add',
    }).then(
      (result) => {
        if (result.isConfirmed){
          fetch("http://localhost:4000/todos/add",{
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              title:result.value
            })
          })
        }
      }
    )
  })
  //Intento de Modal
  const $listaTareas = document.createElement("div");
  $listaTareas.classList.add("flex","flex-col","gap-y-3","my-4")
  $listaTareas.id = "listaTareas";

  //Fetch para cada tarjeta
  fetch("http://localhost:4000/todos", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        const numero = data.todos.findIndex((el)=>el.id == todo.id)
        const $tarjeta = tarjeta(todo,numero)
        document.querySelector("#listaTareas").appendChild($tarjeta)
      })})



  container.appendChild($Agregar)
  container.appendChild($listaTareas)
  return container;
};
