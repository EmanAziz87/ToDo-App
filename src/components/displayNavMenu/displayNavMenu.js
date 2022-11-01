import './displayNavMenu.css';

function displayNavMenu() {
    const mainContainer = document.querySelector('#content');
    const navContainer = document.createElement('nav');
    const navAddToDoButton = document.createElement('button');

    navAddToDoButton.textContent = '+';

    navContainer.classList.add('nav-container');
    navAddToDoButton.classList.add('nav-add-todo-button');

    mainContainer.appendChild(navContainer);
    navContainer.appendChild(navAddToDoButton);
}

export { displayNavMenu }