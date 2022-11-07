import { displayToDoCard, recycleThroughTodos, toDoCardContainer } from '../displayToDoCard/displayToDoCard';
import { projectsArr, storageToDo } from '../manageToDo/manageToDo';
import './displayNavMenu.css';

const navContainer = document.createElement('nav');
const navAddToDoButton = document.createElement('button');
let currentProject = 'Today';

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

    todayTasks.classList.add('project');
    thisWeekTasks.classList.add('project');
    importantTasks.classList.add('project');


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

    
    window.addEventListener('click', function(e) {
        if (e.path[0].className === 'project') {
            selectedProjectHeader.textContent = e.target.innerHTML;  
            currentProject = e.target.innerHTML;
            const currentProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
            while (toDoCardContainer.firstChild) {
                toDoCardContainer.removeChild(toDoCardContainer.lastChild); 
            }
            // displayToDoCard(currentProjectIndex, projectsArr);
            recycleThroughTodos(currentProjectIndex, projectsArr);
        }
    });
    
    function addCustomProject() {
        const addProjectButton = document.createElement('input');
        addProjectButton.setAttribute('type', 'button');
        addProjectButton.setAttribute('value', 'Add Project');
        
        addProjectButton.classList.add('add-project-button');
        navContainer.appendChild(addProjectButton);

        addProjectButton.addEventListener('click', function() {
            const customProjectCreationContainer = document.createElement('div');
            const customProject = document.createElement('input');
            const customProjectConfirm = document.createElement('button');
            const customProjectCancel = document.createElement('button');

            customProjectConfirm.textContent = 'Add';
            customProjectCancel.textContent = 'Cancel';

            customProject.setAttribute('type', 'text');

            customProjectCreationContainer.classList.add('project-creation-container');

            customProject.textContent = 'temporary name';
            customProject.classList.add('project-naming');

            customProjectsContainer.appendChild(customProjectCreationContainer);
            customProjectCreationContainer.appendChild(customProject);
            customProjectCreationContainer.appendChild(customProjectConfirm);
            customProjectCreationContainer.appendChild(customProjectCancel);

            customProjectConfirm.addEventListener('click', function() {
                currentProject = customProject.value;
                const customProjectCreated = document.createElement('button');
                storageToDo.storeNewProject({project: currentProject, toDos: []});
                customProjectCreated.classList.add('project');
                customProjectCreated.textContent = currentProject;
                selectedProjectHeader.textContent = currentProject
                customProjectsContainer.removeChild(customProjectsContainer.lastChild);
                customProjectsContainer.appendChild(customProjectCreated);
                while (toDoCardContainer.firstChild) {
                    toDoCardContainer.removeChild(toDoCardContainer.lastChild);
                }
            });

            customProjectCancel.addEventListener('click', function() {
                customProjectsContainer.removeChild(customProjectsContainer.lastChild);
            });
        });
    }

    addCustomProject();    
}

export { 
    displayNavMenu,
    navContainer, 
    projectManager,
    navMenuReappear,
    currentProject
 }