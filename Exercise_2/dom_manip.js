// Step 1
let container = document.getElementById('container');
console.log(container);

// Step 2
let container2 = document.querySelector('section#container');
console.log(container2);

// Step 3
let seconds = document.querySelectorAll('li.second');
console.log(seconds);

// Step 4
let secondOL = document.querySelectorAll('ol>li.second');
console.log(secondOL);

// Step 5
document.querySelector('section#container').append('Hello');

// Step 6
let footer = document.querySelector('div.footer');
footer.classList.add('main');

// Step 7
footer.classList.remove('main');

// Step 8-10
let list = container.querySelector('ul');
let newElem = document.createElement('li');
newElem.innerText = 'four';
list.append(newElem);
console.log(newElem);

// Step 11
let listElems = document.querySelectorAll('ol>li');
for (let elem of listElems) {
    elem.style.backgroundColor = 'green';
}
console.log(listElems);

// Step 12
document.querySelector('div.footer').remove();