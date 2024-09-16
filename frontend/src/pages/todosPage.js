import Swal from "sweetalert2";
import { tarjeta } from "../components/tarjeta";
import { database } from "../../../backend/src/db/database.js";
export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-full",
    "w-full",
    "bg-gray-200"
  );
  const $agregar = document.createElement("div");
  $agregar.classList.add(
    "bg-slate-200",
    "z-10",
    "justify-center",
    "fixed",
    "right-10",
    "flex",
    "text-center",
    "bottom-10",
    "h-10",
    "w-40",
    "rounded-lg",
    "text-2xl",
    "shadow-md",
    "border-2",
    "border-black"
  );
  const $botonAgregar = document.createElement("button");
  $botonAgregar.classList.add("w-full", "h-full");
  $botonAgregar.textContent = "Add";

  $agregar.appendChild($botonAgregar);
  $botonAgregar.addEventListener("click", () => {
    Swal.fire({
      title: "Add ToDo",
      input: "text",
      inputLabel: "Title:",
      showCancelButton: true,
      confirmButtonText: "Add",
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.trim() == "") {
          Swal.fire({
            title: "no.",
            icon: "error",
          });
        } else {
          fetch("http://localhost:4000/todos/add", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: result.value,
            }),
          }).then(async (el) => {
            const datos = await el.json();
            console.log(datos);
            document.querySelector("#listaTareas").appendChild(tarjeta(datos));
          });
        }
      }
    });
  });

  const $salir = document.createElement("button");
  $salir.classList.add(
    "bg-red-200",
    "z-10",
    "justify-center",
    "fixed",
    "left-10",
    "flex",
    "text-center",
    "top-10",
    "h-10",
    "w-40",
    "rounded-lg",
    "text-2xl",
    "shadow-lg"
  );
  $salir.innerText = "Exit";
  $salir.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const $listaTareas = document.createElement("div");
  const $tituloLista = document.createElement("h1");
  $tituloLista.innerText = "Todos List";
  $tituloLista.classList.add("text-3xl", "text-center", "font-semibold");
  $tituloLista;
  $listaTareas.classList.add(
    "flex",
    "flex-col",
    "gap-y-5",
    "my-4",
    "mt-10",
    "h-full"
  );
  $listaTareas.id = "listaTareas";

  //Fetch para cada tarjeta
  fetch("http://localhost:4000/todos", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        const numero = data.todos.findIndex((el) => el.id == todo.id);
        const $tarjeta = tarjeta(todo, numero);
        document.querySelector("#listaTareas").appendChild($tarjeta);
      });
    });

  container.appendChild($agregar);
  container.appendChild($listaTareas);
  $listaTareas.appendChild($tituloLista);
  container.appendChild($salir);
  document.querySelector("body").classList.add("bg-gray-200");
  return container;
};
