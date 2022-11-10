import { displayToDoCard, recycleThroughTodos, selectedProjectHeader, toDoCardContainer } from '../displayToDoCard/displayToDoCard';
import { currentProjectIndex, projectIndex, projectsArr, storageToDo } from '../manageToDo/manageToDo';
import './displayNavMenu.css';
import threeDots from './3-vertical-dots-icon.svg';

const navContainer = document.createElement('nav');
const navAddToDoButton = document.createElement('button');
let currentProject = 'Today';

let addProjectProcess = false;


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

function projectHighlighter() {
    const allProjects = document.querySelectorAll('div.project-container button.project');
    allProjects.forEach((project) => {
        if (project.innerHTML === currentProject) {
            project.classList.add('selected-project-tab');
        } else {
            project.classList.remove('selected-project-tab');
        }
    });
}

function addCustomProject(customProjectsContainer, selectedProjectHeader) {
    const addProjectButton = document.createElement('input');
    addProjectButton.setAttribute('type', 'button');
    addProjectButton.setAttribute('value', 'Add Project');
    
    addProjectButton.classList.add('add-project-button');
    navContainer.appendChild(addProjectButton);
    addProjectButton.addEventListener('click', function() {
        if (!addProjectProcess) {
            addProjectProcess = true;               
            const customProjectCreationContainer = document.createElement('div');
            const customProject = document.createElement('input');
            const customProjectConfirm = document.createElement('button');
            const customProjectCancel = document.createElement('button');
            const addAndCancelContainer = document.createElement('div');

            customProject.setAttribute('type', 'text');

            customProjectCreationContainer.classList.add('custom-project-creation-container');
            customProject.classList.add('custom-project-input');
            customProjectConfirm.classList.add('custom-project-confirm');
            customProjectCancel.classList.add('custom-project-cancel');
            addAndCancelContainer.classList.add('add-and-cancel-container');
            

            customProject.textContent = 'temporary name';
            customProject.classList.add('project-naming');

            customProjectsContainer.appendChild(customProjectCreationContainer);
            customProjectCreationContainer.appendChild(customProject);
            customProjectCreationContainer.appendChild(customProjectConfirm);
            customProjectCreationContainer.appendChild(addAndCancelContainer);
            addAndCancelContainer.appendChild(customProjectConfirm);
            addAndCancelContainer.appendChild(customProjectCancel);


            customProjectConfirm.addEventListener('click', function() {
                if (customProject.value) {
                    const customProjectCreated = document.createElement('button');
                    const newProjectContainer = document.createElement('div');
                    const editIcon = document.createElement('img');
                    addProjectProcess = false;
                    addProjectButton.classList.remove('.add-project-button-active');
                    currentProject = customProject.value;
                    storageToDo.storeNewProject({project: currentProject, toDos: []});
                    customProjectCreated.classList.add('project', 'custom-project-created');
                    customProjectCreated.textContent = currentProject;
                    selectedProjectHeader.textContent = currentProject
                    customProjectsContainer.removeChild(customProjectsContainer.lastChild);
                    customProjectsContainer.appendChild(newProjectContainer);
                    newProjectContainer.appendChild(customProjectCreated);
                    newProjectContainer.classList.add('new-project-container');
                    editIcon.src = threeDots;
                    editIcon.classList.add('edit-project-icon');
                    newProjectContainer.appendChild(editIcon);
                    // customProjectsContainer.appendChild(customProjectCreated);
                    while (toDoCardContainer.firstChild) {
                        toDoCardContainer.removeChild(toDoCardContainer.lastChild);
                    }
                    projectHighlighter();
                    editProjectDropDown(newProjectContainer, editIcon);
                    console.log(projectsArr);
                }
            });
            
            customProjectCancel.addEventListener('click', function() {
                addProjectProcess = false;
                addProjectButton.classList.remove('.add-project-button-active');
                customProjectsContainer.removeChild(customProjectsContainer.lastChild);
            });
            
            
        }
    });
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
    projectHighlighter();

    window.addEventListener('click', function(e) {
        if (e.target.className === 'project' || e.target.classList[0] === 'project') {
            selectedProjectHeader.textContent = e.target.innerHTML; 
            currentProject = e.target.innerHTML;
            while (toDoCardContainer.firstChild) {
                toDoCardContainer.removeChild(toDoCardContainer.lastChild); 
            }
            projectHighlighter();
            recycleThroughTodos(projectIndex(), projectsArr);
        }
    });
    
    addCustomProject(customProjectsContainer, selectedProjectHeader); 
}

function editProjectDropDown(newProjectContainer, editIcon) {
    const dropDowncontainer = document.createElement('div');
    const editOption = document.createElement('button');
    const deleteOption = document.createElement('button');
    
    newProjectContainer.appendChild(dropDowncontainer);
    dropDowncontainer.appendChild(editOption);
    dropDowncontainer.appendChild(deleteOption);
    
    dropDowncontainer.classList.add('drop-down-project-container');
    editOption.classList.add('edit-option', 'card-dropdown');
    deleteOption.classList.add('delete-option', 'card-dropdown');
    
    editOption.textContent = 'Edit';
    deleteOption.textContent = 'Remove';
    let editModeState = false;
    editIcon.addEventListener('click', function() {
        if (!editModeState) {
            dropDowncontainer.style.display = 'flex';
            const editedProject = editIcon.parentNode.firstChild.textContent;
            editModeState = true; 
            deleteOption.addEventListener('click', function() {
                storageToDo.removeProject(editedProject);
                editIcon.parentNode.remove();
                while (toDoCardContainer.firstChild) {
                    toDoCardContainer.removeChild(toDoCardContainer.lastChild); 
                }
            });

            editOption.addEventListener('click', function() {
                editIcon.parentNode.firstChild.remove();
                editIcon.parentNode.firstChild.remove();
                dropDowncontainer.remove();  
                if (!addProjectProcess) {
                    editProjectContainer(newProjectContainer);                   

                }          
                editModeState = false;

            });

        } else if (editModeState) {
            editModeState = false;
            dropDowncontainer.style.display = 'none'; 
        }
    });
    
}



function editProjectContainer(newProjectContainer) {   
    addProjectProcess = true;                
    const customProjectsContainer = document.querySelector('.custom-projects-container');
    const customProjectCreationContainer = document.createElement('div');
    const customProject = document.createElement('input');
    const customProjectConfirm = document.createElement('button');
    const customProjectCancel = document.createElement('button');
    const addAndCancelContainer = document.createElement('div');
    const oldProjectContainer = newProjectContainer;
    console.log(currentProject);
    const oldCurrentProject = currentProject;

    customProject.setAttribute('type', 'text');

    customProjectCreationContainer.classList.add('custom-project-creation-container');
    customProject.classList.add('custom-project-input');
    customProjectConfirm.classList.add('custom-project-confirm');
    customProjectCancel.classList.add('custom-project-cancel');
    addAndCancelContainer.classList.add('add-and-cancel-container');
    

    customProject.classList.add('project-naming');
    
    if (customProjectsContainer.firstChild === customProjectsContainer.lastChild) {
        customProjectsContainer.appendChild(customProjectCreationContainer);
    } else {
        customProjectsContainer.insertBefore(customProjectCreationContainer, newProjectContainer);
    }

    // customProjectsContainer.appendChild(customProjectCreationContainer);
    customProjectCreationContainer.appendChild(customProject);
    customProjectCreationContainer.appendChild(customProjectConfirm);
    customProjectCreationContainer.appendChild(addAndCancelContainer);
    addAndCancelContainer.appendChild(customProjectConfirm);
    addAndCancelContainer.appendChild(customProjectCancel);
    
    customProjectConfirm.addEventListener('click', function() {
        if (customProject.value) {
            addProjectProcess = false;
            const newProjectContainer = document.createElement('div');
            const customProjectCreated = document.createElement('button');
            const editIcon = document.createElement('img');
            const previousNode = newProjectContainer.previousNode;
            console.log(previousNode);
            currentProject = customProject.value;

            customProjectCreated.classList.add('project', 'custom-project-created');
            newProjectContainer.classList.add('new-project-container');
            
            customProjectCreated.textContent = currentProject;
            selectedProjectHeader.textContent = currentProject

            if (customProjectsContainer.firstChild === customProjectsContainer.lastChild) {
                customProjectsContainer.appendChild(newProjectContainer);
            } else {
                customProjectsContainer.insertBefore(newProjectContainer, oldProjectContainer);
            }
            newProjectContainer.appendChild(customProjectCreated);
            newProjectContainer.appendChild(editIcon);

            editIcon.src = threeDots;

            editIcon.classList.add('edit-project-icon');
            customProjectCreationContainer.remove();
            storageToDo.editProject(oldCurrentProject, currentProject);
            projectHighlighter();
            // projectManager();
            while (toDoCardContainer.firstChild) {
                toDoCardContainer.removeChild(toDoCardContainer.lastChild); 
            }
            oldProjectContainer.remove();
            recycleThroughTodos(projectIndex(), projectsArr);
            editProjectDropDown(newProjectContainer, editIcon);
        }
    });

    customProjectCancel.addEventListener('click', function() {
        addProjectProcess = false;
        addProjectButton.classList.remove('.add-project-button-active');
        customProjectsContainer.removeChild(customProjectsContainer.lastChild);
    });
}


export { 
    displayNavMenu,
    navContainer, 
    projectManager,
    navMenuReappear,
    currentProject,
    editProjectContainer
 }