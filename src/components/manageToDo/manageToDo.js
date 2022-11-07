import { currentProject } from "../displayNavMenu/displayNavMenu";
import { displayToDoCard } from "../displayToDoCard/displayToDoCard";
import './manageToDo.css';

let thingsToDo = [];
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
        }
        return toDoObject;
    }

    function storeNewProject(projectObject) {
        projectsArr.push(projectObject);
        console.log(projectsArr);
    }

    function toDoStorage(toDoObject) {
        currentProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
        projectsArr[currentProjectIndex].toDos.push(toDoObject);
        console.log(projectsArr);
    }

    function addToDo() {
        const navAddToDoButton = document.querySelector('.nav-add-todo-button');
        const navContainer = document.querySelector('.nav-container');
        let toDoFormVisibility = false;
        navAddToDoButton.addEventListener('click', () => {
            if (!toDoFormVisibility) {
                toDoFormVisibility = true;
                const formContainer = document.createElement('form');
                const exitFormContainer = document.createElement('button');
                const formFieldSet = document.createElement('fieldset');
                const formLegend = document.createElement('legend');

                const toDoNameLabel = document.createElement('label');
                const toDoNameInput = document.createElement('input');
                const toDoDueDateLabel = document.createElement('label');
                const toDoDueDateInput = document.createElement('input');

                const todoSubmitButton = document.createElement('input');

                toDoNameLabel.textContent = 'Name:';
                toDoNameLabel.setAttribute('for', 'form-name');
                toDoNameInput.setAttribute('type', 'text');
                toDoNameInput.setAttribute('id', 'form-name');
                toDoNameInput.setAttribute('name', 'form-name');
                toDoNameInput.setAttribute('placeholder', 'Write a task');
                toDoNameInput.setAttribute('required', '');
                
                
                toDoDueDateLabel.textContent = 'Due Date:';
                toDoDueDateLabel.setAttribute('for', 'form-due-date');
                toDoDueDateInput.setAttribute('type', 'date');
                toDoDueDateInput.setAttribute('id', 'form-due-date');
                toDoDueDateInput.setAttribute('name', 'form-due-date');
                toDoDueDateInput.setAttribute('placeholder', 'When is it due?');
                toDoDueDateInput.setAttribute('required', '');
        

        
                todoSubmitButton.setAttribute('type', 'submit');
                todoSubmitButton.setAttribute('value', 'Add');
        

        
                formLegend.textContent = 'Add ToDo:';
                exitFormContainer.textContent = 'X';
                
                formContainer.classList.add('form-container');
                exitFormContainer.classList.add('exit-form-button');
                formFieldSet.classList.add('form-fieldset');
                
        
                navContainer.appendChild(formContainer);
                formContainer.appendChild(formFieldSet);
                formContainer.appendChild(exitFormContainer);
                formFieldSet.appendChild(formLegend);
                formFieldSet.appendChild(toDoNameLabel);
                formFieldSet.appendChild(toDoNameInput);
                formFieldSet.appendChild(toDoDueDateLabel);
                formFieldSet.appendChild(toDoDueDateInput);
                formFieldSet.appendChild(todoSubmitButton);
                
                todoSubmitButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (toDoNameInput.value && toDoDueDateInput.value) {
                        userInputArr.push(toDoNameInput.value);
                        userInputArr.push(toDoDueDateInput.value);
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
                    while (formContainer.firstChild) {
                        formContainer.removeChild(formContainer.lastChild);
                    }
                    toDoFormVisibility = false;
                });
            }
        });
    }

    return { toDoStorage, addToDo, storeInputAsObject, storeNewProject }
}

const storageToDo = manageToDo();

export { storageToDo, currentProjectIndex, projectsArr }

