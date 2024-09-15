import Swal from "sweetalert2";

export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const $btnAdd = document.createElement("button");
  $btnAdd.innerText = "Add";
  $btnAdd.classList.add(
    "bg-slate-200",
    "text-black",
    "h-10",
    "w-20",
    "p-2",
    "rounded",
    "shadow-md",
    "hover:bg-blue-600",
    "mb-4"
  );
  $btnAdd.addEventListener("click", () => {
    Swal.fire({
      title: "Add Todo",
      input: "text",
      inputLabel: "Todo Title",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "yes",
      cancelButtonText: "no",
    }).then((results) => {
      if (results.isConfirmed) {
        try {
          fetch("http://localhost:4000/todos/add", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: results.value }),
          });
        } catch (error) {
          console.log(error);
          alert("Malió sal");
        } finally {
          window.location.reload();
        }
      }
    });
  });

  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("div");

  table.classList.add("w-full", "h-[700px]", "overflow-y-scroll");

  const thead = document.createElement("thead");

  const tbody = document.createElement("div");
  tbody.id = "listaTareas";

  tbody.classList.add("text-center", "flex", "flex-col", "items-center");
  table.appendChild(tbody);

  container.appendChild(btnHome);
  fetch("http://localhost:4000/todos", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        const $tarea = document.createElement("div");
        $tarea.classList.add(
          "flex",
          "flex-col",
          "justify-center",
          "shadow-md",
          "bg-slate-100",
          "h-20",
          "w-4/6",
          "rounded-xl",
          "my-2"
        );

        const $tareaTitulo = document.createElement("h1");
        $tareaTitulo.innerText = todo.title;
        $tareaTitulo.classList.add("font-semibold", "text-lg");
        const $tareaBotones = document.createElement("div");
        $tareaBotones.classList.add(
          "flex",
          "justify-center",
          "flex-col-reverse",
          "w-full"
        );

        const $tareaEliminar = document.createElement("button");
        $tareaEliminar.innerText = "Delete";
        $tareaEliminar.classList.add(
          "bg-red-100",
          "hover:bg-red-200",
          "w-20",
          "rounded-lg",
          "shadow-sm"
        );
        const $tareaEditar = document.createElement("button");
        $tareaEditar.classList.add(
          "bg-blue-100",
          "hover:bg-blue-200",
          "w-20",
          "rounded-lg",
          "shadow-sm"
        );
        $tareaEditar.innerText = "Edit";
        $tareaEditar.addEventListener("click", () => {
          Swal.fire({
            title: "Edit Todo",
            input: "text",
            inputValue: todo.title,
            icon: "question",
            confirmButtonText: "Edit",
            showCancelButton: true,
            cancelButtonText: "Cancel",
          }).then((results) => {
            if (results.isConfirmed) {
              try {
                fetch(`http://localhost:4000/todos/edit/${todo.id}`, {
                  method: "PUT",
                  credentials: "include",
                  body: JSON.stringify({ title: results.value }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
              } catch (error) {
                console.log(error);
                alert("Salió mal");
              } finally {
                window.location.reload();
              }
            }
          });
        });

        $tareaEliminar.addEventListener("click", async () => {
          try {
            const peticion = await fetch(
              `http://localhost:4000/todos/delete/${todo.id}`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "Application/Json",
                },
              }
            );
          } catch (error) {
            console.log(error);
          } finally {
            window.location.reload();
          }
        });
        //Juntar todo
        $tarea.appendChild($tareaTitulo);
        $tarea.appendChild($tareaBotones);
        $tareaBotones.appendChild($tareaEliminar);
        $tareaBotones.appendChild($tareaEditar);
        document.querySelector("#listaTareas").appendChild($tarea);
      });
    });

  container.appendChild($btnAdd);
  container.appendChild(title);
  container.appendChild(table);

  return container;
};
