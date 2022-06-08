let body = document.querySelector('body')
console.log(body);
document.addEventListener('pointermove', (event) => {
    let red = (event.pageX / window.innerWidth) * 255;
    let blue = (event.pageY / window.innerHeight) * 255;
    body.style.backgroundColor = `rgb(${red}, 0, ${blue})`;
});