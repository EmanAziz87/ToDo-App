import { currentProject, navContainer, projectManager } from '../displayNavMenu/displayNavMenu';
import { editModeContainer, projectsArr, storageToDo } from '../manageToDo/manageToDo';
import threeDots from './3-vertical-dots-icon.svg';
import './displayToDoCard.css';

const mainContent = document.querySelector('#content');
const toDoCardAreaBackground = document.createElement('article');
const toDoCardAreaMain = document.createElement('div');
const toDoCardContainer = document.createElement('section');
const selectedProjectHeader = document.createElement('p');


function cardArea () {
    const navAndCardAreaContainer = document.createElement('div');

    navAndCardAreaContainer.classList.add('nav-and-card-area-container');
    toDoCardAreaBackground.classList.add('todo-card-area-background');
    toDoCardAreaMain.classList.add('todo-card-area-main');
    selectedProjectHeader.classList.add('selected-project-header');
    toDoCardContainer.classList.add('todo-card-container');

    selectedProjectHeader.textContent = 'Today';

    mainContent.appendChild(navAndCardAreaContainer);
    toDoCardAreaBackground.appendChild(toDoCardAreaMain);
    toDoCardAreaMain.appendChild(selectedProjectHeader);
    toDoCardAreaMain.appendChild(toDoCardContainer);
    navAndCardAreaContainer.appendChild(navContainer);
    navAndCardAreaContainer.appendChild(toDoCardAreaBackground);
    
    projectManager();
};


function editDropDownMenu(toDoCard, editIcon) {
    let editModeState = false;
    const dropDowncontainer = document.createElement('div');
    const editOption = document.createElement('button');
    const deleteOption = document.createElement('button');

    toDoCard.appendChild(dropDowncontainer);
    dropDowncontainer.appendChild(editOption);
    dropDowncontainer.appendChild(deleteOption);
    
    dropDowncontainer.classList.add('drop-down-container');
    editOption.classList.add('edit-option', 'card-dropdown');
    deleteOption.classList.add('delete-option', 'card-dropdown');

    editOption.textContent = 'Edit';
    deleteOption.textContent = 'Remove';

    editIcon.addEventListener('click', function() {
        if (!editModeState) {
            dropDowncontainer.style.display = 'flex';
            const editedToDo = editIcon.parentNode.childNodes[1].childNodes[1].childNodes[0].textContent;
            editModeState = true; 
            deleteOption.addEventListener('click', function() {
                storageToDo.removeToDo(editedToDo)
                editIcon.parentNode.remove();
                console.log(projectsArr);
            });

            editOption.addEventListener('click', function() {
                const editedToDo = editIcon.parentNode.childNodes[1].childNodes[1].childNodes[0].textContent;
                while (toDoCard.firstChild) {
                    toDoCard.removeChild(toDoCard.lastChild);
                };
                editModeContainer(toDoCard, editedToDo);
                

            });

        } else if (editModeState) {
            editModeState = false;
            dropDowncontainer.style.display = 'none'; 
        }
    });
    
}
 
function displayToDoCard(currentProjectIndex, projectArr) {
    for (let i = projectArr[currentProjectIndex].toDos.length - 1; i < projectArr[currentProjectIndex].toDos.length; i++ ) {
        if ((projectArr[currentProjectIndex].toDos.length) > 0) {
            
            const toDoCard = document.createElement('div');
            const cardContentSubContainer = document.createElement('div');
            const cardNameAndDescription = document.createElement('div');
            const cardDueDateAndPriority = document.createElement('div');
            const checkBox = document.createElement('button');
            const editIcon = document.createElement('img');

            editIcon.src = threeDots;
            
            toDoCardContainer.appendChild(toDoCard);
            toDoCard.appendChild(checkBox);
            toDoCard.appendChild(cardContentSubContainer);
            toDoCard.appendChild(editIcon);
            cardContentSubContainer.appendChild(cardDueDateAndPriority);
            cardContentSubContainer.appendChild(cardNameAndDescription);
            checkBox.textContent = '✓';
            
            toDoCard.classList.add('todo-card');
            checkBox.classList.add(`todo-checkbox-${i}`, 'todo-checkbox');
            cardContentSubContainer.classList.add('card-content-subcontainer');
            cardDueDateAndPriority.classList.add('card-due-date-and-priority');
            editIcon.classList.add('edit-card-icon');

            editDropDownMenu(toDoCard, editIcon);

            let j = 0;
            
            for (const property in projectArr[currentProjectIndex].toDos[i]) {
                const toDoCardContent = document.createElement('div');
                const todoClassNamesArr = ['todo-name', 'todo-due-date'];
                
                toDoCardContent.classList.add(todoClassNamesArr[j]);
                
                toDoCardContent.textContent = projectArr[currentProjectIndex].toDos[i][property];
                
                if (property === 'name') {
                    cardNameAndDescription.appendChild(toDoCardContent);
                    
                } else if (property === 'dueDate') {
                    cardDueDateAndPriority.appendChild(toDoCardContent);
                }
                j++; 
            }
        }
    }

}

function displayEditedToDoCard(currentProjectIndex, projectArr, toDoIndex, editedToDo, toDoCard) {
    for (let i = toDoIndex; i < toDoIndex + 1; i++ ) {
        if (projectArr[currentProjectIndex].toDos.length > 0) {
            const newToDoCard = document.createElement('div');
            const cardContentSubContainer = document.createElement('div');
            const cardNameAndDescription = document.createElement('div');
            const cardDueDateAndPriority = document.createElement('div');
            const checkBox = document.createElement('button');
            const editIcon = document.createElement('img');

            editIcon.src = threeDots;
            
            toDoCardContainer.insertBefore(newToDoCard, toDoCard);
            newToDoCard.appendChild(checkBox);
            newToDoCard.appendChild(cardContentSubContainer);
            newToDoCard.appendChild(editIcon);
            cardContentSubContainer.appendChild(cardDueDateAndPriority);
            cardContentSubContainer.appendChild(cardNameAndDescription);
            checkBox.textContent = '✓';
            
            newToDoCard.classList.add('todo-card');
            checkBox.classList.add('todo-checkbox');
            cardContentSubContainer.classList.add('card-content-subcontainer');
            cardDueDateAndPriority.classList.add('card-due-date-and-priority');
            editIcon.classList.add('edit-card-icon');

            toDoCard.remove();

            let j = 0;
            console.log("hey");
            for (const property in projectArr[currentProjectIndex].toDos[toDoIndex]) {
                console.log('first step of the loop');
                const toDoCardContent = document.createElement('div');
                const todoClassNamesArr = ['todo-name', 'todo-due-date'];
                
                toDoCardContent.classList.add(todoClassNamesArr[j]);
                
                toDoCardContent.textContent = projectArr[currentProjectIndex].toDos[i][property];
                console.log(toDoCardContent.textContent);
                if (property === 'name') {
                    cardNameAndDescription.appendChild(toDoCardContent);
                    
                } else if (property === 'dueDate') {
                    cardDueDateAndPriority.appendChild(toDoCardContent);
                }
                j++; 
            }

            editDropDownMenu(newToDoCard, editIcon);

            
        }
    
    }

}

function recycleThroughTodos(currentProjectIndex, projectArr) {
    for (let i = 0; i < projectArr[currentProjectIndex].toDos.length; i++ ) {
        if ((projectArr[currentProjectIndex].toDos.length) > 0) {

            const toDoCard = document.createElement('div');
            const cardContentSubContainer = document.createElement('div');
            const cardNameAndDescription = document.createElement('div');
            const cardDueDateAndPriority = document.createElement('div');
            const checkBox = document.createElement('button');
            const editIcon = document.createElement('img');

            editIcon.src = threeDots;
    
            toDoCardContainer.appendChild(toDoCard);
            toDoCard.appendChild(checkBox);
            toDoCard.appendChild(cardContentSubContainer);
            toDoCard.appendChild(editIcon);
            cardContentSubContainer.appendChild(cardDueDateAndPriority);
            cardContentSubContainer.appendChild(cardNameAndDescription);

    
            checkBox.textContent = '✓';
            
            toDoCard.classList.add('todo-card', 'todo-card');
            checkBox.classList.add(`todo-checkbox-${i}`, 'todo-checkbox');
            cardContentSubContainer.classList.add('card-content-subcontainer');
            cardDueDateAndPriority.classList.add('card-due-date-and-priority');
            editIcon.classList.add('edit-card-icon');

            
            editDropDownMenu(toDoCard, editIcon);

            let j = 0;

            for (const property in projectArr[currentProjectIndex].toDos[i]) {
                const toDoCardContent = document.createElement('div');
                const todoClassNamesArr = ['todo-name', 'todo-due-date'];
                
                toDoCardContent.classList.add(todoClassNamesArr[j]);
                
                toDoCardContent.textContent = projectArr[currentProjectIndex].toDos[i][property];
                
                if (property === 'name') {
                    cardNameAndDescription.appendChild(toDoCardContent);
                    
                } else if (property === 'dueDate') {
                    cardDueDateAndPriority.appendChild(toDoCardContent);
                }
                
                j++; 
            }
        }
    }

    const allToDoCheckboxes = document.querySelectorAll('.todo-checkbox');
    allToDoCheckboxes.forEach((toDoCheckbox) => {
        let completedToDoName = toDoCheckbox.parentNode.childNodes[1].childNodes[1].childNodes[0].textContent;
        const findProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
        projectsArr[findProjectIndex].toDos.forEach((toDoObject) => {
            if (toDoObject.name === completedToDoName) {
                const completedOrNot = toDoObject.completed;
                if (completedOrNot) {
                    toDoCheckbox.classList.add('completed-checkbox');
                    toDoCheckbox.parentNode.childNodes[1].childNodes[1].childNodes[0].classList.add('todo-strikethrough');
                    storageToDo.markAsCompleted(completedToDoName, currentProject);     
                }
            }
        });

    }); 

}

function completeToDo() {
    window.addEventListener('click', function(e) {
        if (e.target.innerHTML === '✓') { 
            const allToDoCheckboxes = document.querySelectorAll('.todo-checkbox');
            allToDoCheckboxes.forEach((toDoCheckbox) => {
                if (e.target.className === toDoCheckbox.className) {
                    let completedToDoName = toDoCheckbox.parentNode.childNodes[1].childNodes[1].childNodes[0].textContent;
                    const findProjectIndex = projectsArr.findIndex(selectedProject => selectedProject.project === currentProject);
                    projectsArr[findProjectIndex].toDos.forEach((toDoObject) => {
                        if (toDoObject.name === completedToDoName) {
                            const completedOrNot = toDoObject.completed;
                            if (!completedOrNot) {
                                toDoCheckbox.classList.add('completed-checkbox');
                                toDoCheckbox.parentNode.childNodes[1].childNodes[1].childNodes[0].classList.add('todo-strikethrough');
                                storageToDo.markAsCompleted(completedToDoName, currentProject);     
                            } else if (completedOrNot){
                                console.log('we made it through!');
                                toDoCheckbox.classList.remove('completed-checkbox');
                                toDoCheckbox.parentNode.childNodes[1].childNodes[1].childNodes[0].classList.remove('todo-strikethrough');
                                storageToDo.changeToIncomplete(completedToDoName, currentProject);        
                            }
                        }
                    });
                }   
            }); 
        } 
    });
}

completeToDo();

export  { 
    displayToDoCard, 
    cardArea, 
    toDoCardAreaMain, 
    toDoCardContainer, 
    selectedProjectHeader, 
    recycleThroughTodos,
    displayEditedToDoCard
} 
