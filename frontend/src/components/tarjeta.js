import Swal from "sweetalert2";
export const tarjeta = (todo, num) => {
  const $tarjeta = document.createElement("div");
  $tarjeta.classList.add(
    "w-80",
    "min-h-20",
    "bg-gray-200",
    "shadow-md",
    "text-2xl",
    "rounded-lg",
    "escondio",
    "flex"
  );
  $tarjeta.style = "filter:blur(3px); transform: translateY(200%)";

  const $tarjetaTitulo = document.createElement("h1");
  $tarjetaTitulo.classList.add(
    "text-wrap",
    "truncate",
    "break-all",
    "overflow-hidden",
    "ml-20",
    "mr-6",
    "mt-4"
  );
  $tarjetaTitulo.innerText = todo.title;
  if (todo.completed == true) {
    $tarjetaTitulo.classList.add("line-through");
  }
  //Eliminar
  const $tarjetaEliminar = document.createElement("button");
  $tarjetaEliminar.classList.add("absolute", "top-0", "right-0");
  $tarjetaEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>`;
  //Evento
  $tarjetaEliminar.addEventListener("click", async () => {
    Swal.fire({
      title: "Delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (response) => {
      if (response.isConfirmed) {
      }
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
        if (peticion.ok) {
          $tarjeta.remove();
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
  //Editar
  const $tarjetaEditar = document.createElement("button");
  $tarjetaEditar.classList.add("absolute", "right-0", "bottom-10", "top-5");
  $tarjetaEditar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
</svg>
`;
  $tarjetaEditar.addEventListener("click", () => {
    Swal.fire({
      title: "Edit",
      input: "text",
      inputValue: $tarjetaTitulo.innerText,
      showCancelButton: true,
      confirmButtonText: "Edit",
    }).then((response) => {
      if (response.isConfirmed) {
        if (response.value.trim() == "") {
          Swal.fire({
            title: "no.",
            icon: "error",
          });
        } else {
          fetch(`http://localhost:4000/todos/edit/${todo.id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "Application/Json",
            },
            body: JSON.stringify({ title: response.value }),
          });
          $tarjetaTitulo.innerText = response.value;
        }
      }
    });
  });

  const $tarjetaCheckbox = document.createElement("input");
  $tarjetaCheckbox.type = "checkbox";
  $tarjetaCheckbox.classList.add("absolute", "top-5");
  $tarjetaCheckbox.checked = todo.completed;

  $tarjetaCheckbox.addEventListener("input", (e) => {
    try {
      const peticion = fetch(`http://localhost:4000/todos/edit/${todo.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify({ done: e.target.checked }),
      });
      if (e.target.checked) {
        $tarjetaTitulo.classList.add("line-through");
      } else {
        $tarjetaTitulo.classList.remove("line-through");
      }
    } catch (error) {
      console.log(error);
    }
  });
  $tarjetaCheckbox.classList.add("w-10", "h-10", "absolute", "left-5");

  //Para ver cuándo aparece
  $tarjeta.addEventListener("DOMNodeInserted", () => {
    setTimeout(() => {
      $tarjeta.classList.remove("escondio");
      $tarjeta.style = `
        filter:blur(0);
        transition: all 2s
        `;
      $tarjeta.classList.add("ease-in-out", "duration-400");
    }, 350 * (num + 1));
  });

  //Momento LEGO
  $tarjeta.appendChild($tarjetaTitulo);
  $tarjeta.appendChild($tarjetaEliminar);
  $tarjeta.appendChild($tarjetaCheckbox);
  $tarjeta.appendChild($tarjetaEditar);
  return $tarjeta;
};
