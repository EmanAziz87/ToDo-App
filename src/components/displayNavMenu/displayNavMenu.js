import './displayNavMenu.css';

const navContainer = document.createElement('nav');
const navAddToDoButton = document.createElement('button');



function displayNavMenu() {
    
    navAddToDoButton.textContent = '+';
    navContainer.classList.add('nav-container');
    navAddToDoButton.classList.add('nav-add-todo-button');

    navContainer.appendChild(navAddToDoButton);
}

function navMenuReappear() {
    const mainContainer = document.querySelector('#content');
    const navAndCardAreaContainer = document.querySelector('.nav-and-card-area-container');
    const navContainer = document.createElement('nav');
    const navAddToDoButton = document.createElement('button');
    navAddToDoButton.textContent = '+';
    mainContainer.appendChild(navContainer);
    navContainer.classList.add('nav-container');
    navAddToDoButton.classList.add('nav-add-todo-button');
    
    navAndCardAreaContainer.prepend(navContainer);
    navContainer.appendChild(navAddToDoButton);
    projectManager();
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
    defaultProjectsContainer.classList.add('default-projects-container', 'projects');
    customProjectsContainer.classList.add('custom-projects-container', 'projects');

    const navContainer = document.querySelector('.nav-container');

    navContainer.appendChild(projectContainer);
    projectContainer.appendChild(defaultProjectsContainer);
    projectContainer.appendChild(customProjectsContainer);
    defaultProjectsContainer.appendChild(todayTasks);
    defaultProjectsContainer.appendChild(thisWeekTasks);
    defaultProjectsContainer.appendChild(importantTasks);

    const selectedProjectHeader =  document.querySelector('.selected-project-header');
    let projectNavButtons = document.querySelectorAll('div.projects > button');


    function projectButtons() {
        projectNavButtons.forEach((button) => {
            button.addEventListener('click', function() {
                projectNavButtons = document.querySelectorAll('div.projects > button');
                selectedProjectHeader.textContent = button.textContent;  
                console.log(button);    
            });
        });
    }

    function addCustomProject() {
        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.textContent = 'Add Project';
        navContainer.appendChild(addProjectButton);

        addProjectButton.addEventListener('click', function() {
            projectNavButtons = document.querySelectorAll('div.projects > button');
            const customProject = document.createElement('button');
            customProject.textContent = 'temporary name';
            customProjectsContainer.appendChild(customProject);
        });
    }

    addCustomProject();
    projectButtons();
    
}

export { 
    displayNavMenu,
    navContainer, 
    projectManager,
    navMenuReappear
 }