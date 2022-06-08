let container = document.querySelector('.container');
let newtodo = document.querySelector('#btn-addnew');
let licenseModal = document.querySelector('#license-modal');
let infoButton = document.querySelector('#btn-info');

infoButton.addEventListener('click', event => {
    if (infoButton.classList.contains('bi-info-circle')) {
        licenseModal.style.display = 'block';
        infoButton.classList.remove('bi-info-circle');
        infoButton.classList.add('bi-x-lg');
    } else {
        licenseModal.style.display = 'none';
        infoButton.classList.remove('bi-x-lg');
        infoButton.classList.add('bi-info-circle');
    }
})

if (localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', JSON.stringify({}));
}
hydrate();

newtodo.addEventListener('click', event => {
    let template = document.querySelector('#todo-item-template');
    let newitem = template.content.cloneNode(true);
    let newNode = newitem.querySelector('.todo-item');
    todoContent = newNode.querySelector('.todo-content');
    // This workaround is credited to chris97ong at https://stackoverflow.com/questions/2388164/set-focus-on-div-contenteditable-element
    // Seems to be caused by a race condition, but passing it off to the scheduler solves the problem
    setTimeout(function() {
        todoContent.focus();
    }, 0);
    todoContent.addEventListener('focusout', finalizeTodo);
    container.append(newitem);
});

container.addEventListener('click', event => {
    if (event.target.classList.contains('btn-complete')) {
        let todoItem = event.target.parentElement;
        let state = todoItem.getAttribute('data-completed');
        todoItem.setAttribute('data-completed', state == 'true' ? false : true)
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos[todoItem.getAttribute('data-id')].completed = false;
        localStorage.setItem(todos, JSON.stringify(todos));
    } else if (event.target.classList.contains('btn-delete')) {
        let todos = JSON.parse(localStorage.getItem('todos'));
        delete todos[event.target.parentElement.getAttribute('data-id')];
        localStorage.setItem('todos', JSON.stringify(todos));
        event.target.parentElement.remove();
    }
});

function finalizeTodo(event) {
    event.target.setAttribute('contenteditable', 'false');
    let uuid = uuidv4();
    event.target.parentElement.setAttribute('data-id', uuid);
    let savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (uuid in savedTodos) {
        uuid = uuidv4();
    }
    savedTodos[uuid] = {
        content: event.target.textContent,
        completed: false
    }
    localStorage.setItem('todos', JSON.stringify(savedTodos));

    event.target.parentElement.removeEventListener('focusout', finalizeTodo);
}

function hydrate() {
    let todos = JSON.parse(localStorage.getItem('todos'));
    console.log(todos);
    for (const uuid in todos) {
        let template = document.querySelector('#todo-item-template');
        let newitem = template.content.cloneNode(true);
        let newNode = newitem.querySelector('.todo-item');
        newNode.setAttribute('data-id', uuid);
        todoContent = newNode.querySelector('.todo-content');
        todoContent.setAttribute('contenteditable', 'false');
        todoContent.textContent = todos[uuid].content;
        newNode.setAttribute('data-completed', todos[uuid].completed);
        container.append(newitem);
    }
}