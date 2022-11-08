import { currentProject } from "../displayNavMenu/displayNavMenu";
import { displayToDoCard } from "../displayToDoCard/displayToDoCard";
import './manageToDo.css';

let projectsArr = [
    {
        project: 'Today',
        toDos: []
    },
    {
        project: 'This Week',
        toDos: []
    },
    {
        project: 'Important',
        toDos: []
    }
];

let currentProjectIndex = 0;
let userInputArr = [];

function manageToDo() {
    function storeInputAsObject(userInputs) {
        const toDoObject = {
            name: userInputs[0],
            dueDate: userInputs[1],
            completed: userInputs[2]
        }
        return toDoObject;
    }

    function storeNewProject(projectObject) {
        projectsArr.push(projectObject);
    }

    function markAsCompleted(completedToDoName, currentProject) {
        const findProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
        projectsArr[findProjectIndex].toDos.forEach((toDoObject) => {
            if (toDoObject.name === completedToDoName) {
                toDoObject['completed'] = true;
            }
        });
    }

    function changeToIncomplete(incompletedToDoName, currentProject) {
        const findProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
        projectsArr[findProjectIndex].toDos.forEach((toDoObject) => {
            if (toDoObject.name === incompletedToDoName) {
                toDoObject['completed'] = false;
            }
        });
    }

    function toDoStorage(toDoObject) {
        currentProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
        projectsArr[currentProjectIndex].toDos.push(toDoObject);
    }

    function addToDo() {
        const navAddToDoButton = document.querySelector('.nav-add-todo-button');
        let toDoFormVisibility = false;
        navAddToDoButton.addEventListener('click', () => {
            if (!toDoFormVisibility) {
                toDoFormVisibility = true;
                const toDoCardContainer = document.querySelector('.todo-card-container');
                const toDoCard = document.createElement('div');
                
                toDoCardContainer.appendChild(toDoCard);                
                
                toDoCard.classList.add('todo-card', 'todo-card');

                ////////////////////
                const formContainer = document.createElement('form');
                const exitFormContainer = document.createElement('button');
                const formFieldSet = document.createElement('fieldset');
                const formLegend = document.createElement('legend');

                const toDoNameLabel = document.createElement('label');
                const toDoNameInput = document.createElement('input');
                const toDoDueDateLabel = document.createElement('label');
                const toDoDueDateInput = document.createElement('input');

                const todoSubmitButton = document.createElement('input');

                toDoNameLabel.textContent = 'Task';
                toDoNameLabel.setAttribute('for', 'form-name');
                toDoNameInput.setAttribute('type', 'text');
                toDoNameInput.setAttribute('id', 'form-name');
                toDoNameInput.setAttribute('name', 'form-name');
                toDoNameInput.setAttribute('placeholder', 'Write a task');
                toDoNameInput.setAttribute('required', '');
                
                
                toDoDueDateLabel.textContent = 'Due';
                toDoDueDateLabel.setAttribute('for', 'form-due-date');
                toDoDueDateInput.setAttribute('type', 'date');
                toDoDueDateInput.setAttribute('id', 'form-due-date');
                toDoDueDateInput.setAttribute('name', 'form-due-date');
                toDoDueDateInput.setAttribute('placeholder', 'When is it due?');
                toDoDueDateInput.setAttribute('required', '');

                todoSubmitButton.setAttribute('type', 'submit');
                todoSubmitButton.setAttribute('value', '');
                
                formContainer.classList.add('form-container');
                exitFormContainer.classList.add('exit-form-button');
                todoSubmitButton.classList.add('todo-submit-button');
                formFieldSet.classList.add('form-fieldset');
                toDoNameInput.classList.add('todo-input');
                
                toDoCard.appendChild(formContainer);
                formContainer.appendChild(formFieldSet);
                formContainer.appendChild(todoSubmitButton);
                formContainer.appendChild(exitFormContainer);
                formFieldSet.appendChild(formLegend);
                formFieldSet.appendChild(toDoNameLabel);
                formFieldSet.appendChild(toDoNameInput);
                formFieldSet.appendChild(toDoDueDateLabel);
                formFieldSet.appendChild(toDoDueDateInput);
                // const reCheckCurrentProject = document.querySelector('.selected-project-header');
                // if (currentProject !== reCheckCurrentProject.textContent) {
                //     toDoFormVisibility = false;
                // }
                
                
                todoSubmitButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (toDoNameInput.value && toDoDueDateInput.value) {
                        toDoCardContainer.removeChild(toDoCardContainer.lastChild);
                        userInputArr.push(toDoNameInput.value);
                        userInputArr.push(toDoDueDateInput.value);
                        userInputArr.push(false);
                        storageToDo.toDoStorage(storageToDo.storeInputAsObject(userInputArr));
                        displayToDoCard(currentProjectIndex, projectsArr);
                        
                        while (formContainer.firstChild) {
                            formContainer.removeChild(formContainer.lastChild);
                        }
            
                        toDoFormVisibility = false;
                        userInputArr = [];
                        
                    } 
                });

                exitFormContainer.addEventListener('click', function() {
                    toDoCardContainer.removeChild(toDoCardContainer.lastChild);
                    while (formContainer.firstChild) {
                        formContainer.removeChild(formContainer.lastChild);
                    }
                    toDoFormVisibility = false;
                });

                const resetFormVisibility = document.querySelectorAll('div.project-container > div > button');
                resetFormVisibility.forEach((project) => {
                    project.addEventListener('click', function() {
                        if (project.textContent !== currentProject) {
                            toDoFormVisibility = false;
                        }
                    });
                    
                });
            }
        });
    }

    return { toDoStorage, addToDo, storeInputAsObject, storeNewProject, markAsCompleted, changeToIncomplete }
}

const storageToDo = manageToDo();

export { storageToDo, currentProjectIndex, projectsArr }

