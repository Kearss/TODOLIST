//Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event kuuntelijat
//Lataa kaikki tiedot sivun latautuessa
document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functiolla lisätään todot
function addTodo(e){

  // Estää listan lähettämästä ja sivun päivyytämästä
  e.preventDefault();

  //Tehdään tododiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Tekee li rivin
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  if(todoInput.value == null || todoInput.value.length < "3"){
    alert("You must write something!");
    document.getElementById("input").style.borderColor = "red";
  }else{
      document.getElementById("input").style.borderColor = "white";
      // Lisätään todo Localstorage
      saveLocalTodos(todoInput.value);

      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      
      // Tyhjennä todo arvo input kentältä
      todoInput.value = ""; 

      // Valmis nappula
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("valmis-btn");
      todoDiv.appendChild(completedButton);

      // Poista nappi
      const removeButton = document.createElement("button");
      removeButton.innerHTML = `<i class="fas fa-trash"></i>`;
      removeButton.classList.add("poista-btn");
      todoDiv.appendChild(removeButton);

      // Lisää listan
      todoList.appendChild(todoDiv);
  }
}
// Poisto ja valmis checkaus
function deleteCheck(e){
  const item = e.target;
// Poistaa rivin
  if(item.classList[0] === "poista-btn"){
      const todo = item.parentElement;
      removeLocalTodos(todo);
      todo.remove();
    }
    // Valmis chekkaus
  if(item.classList[0] === "valmis-btn"){
      const todo = item.parentElement;
      todo.classList.toggle('completed');
    }
}
// Todo filtteri
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      // Näyttää kaikki tehtävät
      case "all":
        todo.style.display = "flex";
        break;
      // Ainoastaa näyttää valmiiks tehdyt
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      // Näyttää vain tekemättä olevat tehtävät
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

// Lokaalinen varasto
function saveLocalTodos(todo){
  // Tarakistaa jos todo lista on jo olemassa, jos ei ole niin se tekee uuden tyhjän
  if(localStorage.getItem("todos")=== null){
    todos = [];
  // Jos meillä on jo todo lista ja hakee todo listan lokaaliselta storagesta.  
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Tallentaa uuden tuloksen storageen
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Poistaa ja tallentaa lokaaliselta storagesta tiedon
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Kysyy mistä aloitetaan poistaminen
  const todoIndex = todo.children[0].innerText;

  // Kysyy kuinka monta riviä poistaa
  todos.splice(todos.indexOf(todoIndex), 1);

  // Tallanetaa loppu tuloksen storageen
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
  // Tekee todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo")

  //Tekee li rivin
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Valmis nappi
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`; 
  completedButton.classList.add("valmis-btn");
  todoDiv.appendChild(completedButton);

  // Poista nappi
  const removeButton = document.createElement("button");
  removeButton.innerHTML = `<i class="fas fa-trash"></i>`;
  removeButton.classList.add("poista-btn");
  todoDiv.appendChild(removeButton);

  // Lista lisätään
  todoList.appendChild(todoDiv);

  });
}

