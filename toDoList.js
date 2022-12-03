// select everything
// select the todo-form
// Область видимости переменных var ограничивается либо функцией, либо, если переменная глобальная, то скриптом.
// Такие переменные доступны за пределами блока.
// let - почти var))
// Объявление const задаёт константу, то есть переменную, которую нельзя менять
const todoForm = document.querySelector('.my__todo-form');
// select the input box
const todoInput = document.querySelector('.my__todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.my__todo-items');
// array which stores every toDoList
let toDoList = [];
// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
    // prevent the page from reloading when submitting the form
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function with input box current value
});
// function to add todo
function addTodo(item) {
    // if item is not empty
    if (item !== '') {
        // make a todo object, which has id, name, and completed properties
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
// then add it to toDoList array
        toDoList.push(todo);
        addToLocalStorage(toDoList); // then store it in localStorage
// finally clear the input box value
        todoInput.value = '';
    }
}
// function to render given toDoList to screen
function renderToDoList(toDoList) {
    // clear everything inside <ul> with class=todo-items
    todoItemsList.innerHTML = '';
// run through each item inside toDoList
    toDoList.forEach(function(item) {
        // check if the item is completed
        const checked = item.completed ? 'checked': null;
// make a <li> element and fill it
        // <li> </li>
        const li = document.createElement('li');
        // <li class="item"> </li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li>
        li.setAttribute('data-key', item.id);
        /* <li class="item" data-key="20200708">
              <input type="checkbox" class="checkbox">
              Go to Gym
              <button class="delete-button">X</button>
            </li> */
        // if item is completed, then add a class to <li> called 'checked', which will add line-through style
        if (item.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
        // finally add the <li> to the <ul>
        todoItemsList.append(li);
    });
}
// function to add toDoList to local storage
function addToLocalStorage(toDoList) {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    // render them to screen
    renderToDoList(toDoList);
}
// function helps to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('toDoList');
    // if reference exists
    if (reference) {
        // converts back to array and store it in toDoList array
        toDoList = JSON.parse(reference);
        renderToDoList(toDoList);
    }
}
// toggle the value to completed and not completed
function toggle(id) {
    toDoList.forEach(function(item) {
        // use == not ===, because here types are different. One is number and other is string
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(toDoList);
}
// deletes a todo from toDoList array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
    // filters out the <li> with the id and updates the toDoList array
    toDoList = toDoList.filter(function(item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });
// update the localStorage
    addToLocalStorage(toDoList);
}
// initially get everything from localStorage
getFromLocalStorage();
// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type == 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
// check if that is a delete-button
    if (event.target.classList.contains('delete-button')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});