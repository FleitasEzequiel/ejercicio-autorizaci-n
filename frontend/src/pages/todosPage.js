
export const todosPage = () => {
  
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200",
  );


  const $listaTareas = document.createElement("div");
  $listaTareas.classList.add("flex","flex-col","gap-y-3")
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
        console.log(numero);
        const $tarjeta = document.createElement("div")
        $tarjeta.classList.add("w-80","h-20","bg-gray-200","shadow-md","text-center","p-2","text-xl","rounded-lg","escondio")
        $tarjeta.innerText = todo.title
        $tarjeta.style= "filter:blur(3px); transform: translateY(200%)"

        //Para ver cuándo aparece
        $tarjeta.addEventListener("DOMNodeInserted",()=>{
          setTimeout(() => {
            $tarjeta.classList.remove("escondio")
            $tarjeta.style=`
            filter:blur(0);
            transition: all 2s
            `
          }, 350*numero);
        })
        document.querySelector("#listaTareas").appendChild($tarjeta)
      })})




  container.appendChild($listaTareas)
  return container;
};
