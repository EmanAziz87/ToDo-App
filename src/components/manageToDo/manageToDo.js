import { addCustomProject, currentProject, editProjectContainer } from "../displayNavMenu/displayNavMenu";
import { displayEditedToDoCard, displayToDoCard } from "../displayToDoCard/displayToDoCard";
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
let toDoFormVisibility = false;



function toDoFormCreator() {
    const toDoCardContainer = document.querySelector('.todo-card-container');
    const toDoCard = document.createElement('div');
    
    toDoCardContainer.appendChild(toDoCard);                
    
    toDoCard.classList.add('todo-card', 'todo-card');

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
    toDoDueDateInput.classList.add('todo-due-date-input')
    
    toDoCard.appendChild(formContainer);
    formContainer.appendChild(formFieldSet);
    formContainer.appendChild(todoSubmitButton);
    formContainer.appendChild(exitFormContainer);
    formFieldSet.appendChild(formLegend);
    formFieldSet.appendChild(toDoNameLabel);
    formFieldSet.appendChild(toDoNameInput);
    formFieldSet.appendChild(toDoDueDateLabel);
    formFieldSet.appendChild(toDoDueDateInput);
}

function editModeContainer(toDoCard, editedToDo) {
    const toDoCardContainer = document.querySelector('.todo-card-container');
    // const toDoCard = document.createElement('div');
    
    // toDoCardContainer.appendChild(toDoCard);                
    
    // toDoCard.classList.add('todo-card', 'todo-card');

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
    toDoDueDateInput.classList.add('todo-due-date-input')
    
    toDoCard.appendChild(formContainer);
    formContainer.appendChild(formFieldSet);
    formContainer.appendChild(todoSubmitButton);
    formContainer.appendChild(exitFormContainer);
    formFieldSet.appendChild(formLegend);
    formFieldSet.appendChild(toDoNameLabel);
    formFieldSet.appendChild(toDoNameInput);
    formFieldSet.appendChild(toDoDueDateLabel);
    formFieldSet.appendChild(toDoDueDateInput);

    findToDoIndex(editedToDo);
    todoSubmitButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (toDoNameInput.value && toDoDueDateInput.value) {
            userInputArr.push(toDoNameInput.value);
            userInputArr.push(toDoDueDateInput.value);
            userInputArr.push(false);
            const toDoIndex = findToDoIndex(editedToDo);
            storageToDo.editToDo(editedToDo, storageToDo.storeInputAsObject(userInputArr));
            displayEditedToDoCard(projectIndex(), projectsArr, toDoIndex, editedToDo, toDoCard);
            
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

function projectIndex() {
    const findProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
    return findProjectIndex;
}


function findToDoIndex(editedToDo) {
    const findProjectIndex = projectIndex();
    console.log(`project index: ${findProjectIndex}`);
    console.log(`todo index: ${projectsArr[findProjectIndex].toDos.findIndex(toDoObject => toDoObject.name === editedToDo)}`);
    return projectsArr[findProjectIndex].toDos.findIndex(toDoObject => toDoObject.name === editedToDo); 
            
        

}

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
        const findProjectIndex = projectIndex();
        projectsArr[findProjectIndex].toDos.forEach((toDoObject) => {
            if (toDoObject.name === completedToDoName) {
                toDoObject['completed'] = true;
            }
        });
    }

    function changeToIncomplete(incompletedToDoName, currentProject) {
        const findProjectIndex = projectIndex();
        projectsArr[findProjectIndex].toDos.forEach((toDoObject) => {
            if (toDoObject.name === incompletedToDoName) {
                toDoObject['completed'] = false;
            }
        });
    }

    function removeToDo(editedToDo) {
        const findProjectIndex = projectIndex();
        const newToDoList = projectsArr[findProjectIndex].toDos.filter((toDo) => {
            return toDo.name !== editedToDo;
        });
        projectsArr[findProjectIndex].toDos = newToDoList;
        console.log(projectsArr); 
    }

    function removeProject(editedProject) {
        const newProjectList = projectsArr.filter((project) => {
            return project.project !== editedProject;
        });
        projectsArr = newProjectList;
    }

    function editToDo(editedToDo, toDoObjectInput) {
        const findProjectIndex = projectIndex();
        projectsArr[findProjectIndex].toDos.forEach((toDoObject) => {
            if (toDoObject.name === editedToDo) {
                toDoObject.name = toDoObjectInput.name;
                toDoObject.dueDate = toDoObjectInput.dueDate;
                toDoObject.completed = toDoObjectInput.completed;
            }
        });
    }


    function editProject(oldCurrentProject, editedProject) {
        projectsArr.forEach((project) => {
            if (project.project === oldCurrentProject) {
                console.log(projectsArr);
                project.project = editedProject;
                console.log(projectsArr);
            }
        });
    }

    function toDoStorage(toDoObject) {
        currentProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
        projectsArr[currentProjectIndex].toDos.push(toDoObject);
    }

    function addToDo() {
        const navAddToDoButton = document.querySelector('.nav-add-todo-button');
        navAddToDoButton.addEventListener('click', () => {
            if (!toDoFormVisibility) {
                toDoFormVisibility = true;


                ////////////////////
                
                toDoFormCreator();
                
                const todoSubmitButton = document.querySelector('.todo-submit-button');
                const exitFormContainer = document.querySelector('.exit-form-button');
                const toDoNameInput = document.querySelector('.todo-input');
                const toDoDueDateInput = document.querySelector('.todo-due-date-input');
                const toDoCardContainer = document.querySelector('.todo-card-container');
                const formContainer = document.querySelector('.form-container');

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

    return { toDoStorage, addToDo, storeInputAsObject, storeNewProject, markAsCompleted, changeToIncomplete , removeToDo, editToDo, removeProject, editProject}
}

const storageToDo = manageToDo();

export { storageToDo, currentProjectIndex, projectsArr, toDoFormCreator, editModeContainer, projectIndex }

