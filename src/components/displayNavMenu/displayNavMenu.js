import './displayNavMenu.css';


const navContainer = document.createElement('nav');
const navAddToDoButton = document.createElement('button');

function displayNavMenu() {
    if (navContainer) {
        const navContainer = document.createElement('nav');
        const navAddToDoButton = document.createElement('button');  
    }
    console.log(navContainer);
    navAddToDoButton.textContent = '+';

    navContainer.classList.add('nav-container');
    navAddToDoButton.classList.add('nav-add-todo-button');

    // mainContainer.appendChild(navContainer);
    navContainer.appendChild(navAddToDoButton);
    

    // projectManager();
    
    
}
function projectManager() {
    const projectContainer = document.createElement('div');
    const defaultProjectsContainer = document.createElement('div');
    const customProjectsContainer = document.createElement('div');

    const todayTasks = document.createElement('button');
    const thisWeekTasks = document.createElement('button');
    const importantTasks = document.createElement('button');

    todayTasks.textContent = 'Today';
    thisWeekTasks.textContent = 'This Week';
    importantTasks.textContent = 'Important';

    projectContainer.classList.add('project-container');
    defaultProjectsContainer.classList.add('default-projects-container');
    customProjectsContainer.classList.add('custom-projects-container');

    const navContainer = document.querySelector('.nav-container');

    navContainer.appendChild(projectContainer);
    projectContainer.appendChild(defaultProjectsContainer);
    defaultProjectsContainer.appendChild(todayTasks);
    defaultProjectsContainer.appendChild(thisWeekTasks);
    defaultProjectsContainer.appendChild(importantTasks);
    navContainer.appendChild(customProjectsContainer);
}

export { 
    displayNavMenu,
    navContainer, 
    projectManager
 }