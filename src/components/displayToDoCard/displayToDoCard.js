import { navContainer, projectManager } from '../displayNavMenu/displayNavMenu';
import { projectsArr } from '../manageToDo/manageToDo';
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


function displayToDoCard(currentProjectIndex, projectArr) {
    for (let i = projectArr[currentProjectIndex].toDos.length - 1; i < projectArr[currentProjectIndex].toDos.length; i++ ) {
        if ((projectArr[currentProjectIndex].toDos.length) > 0) {

            const toDoCard = document.createElement('div');
            const cardContentSubContainer = document.createElement('div');
            const cardNameAndDescription = document.createElement('div');
            const cardDueDateAndPriority = document.createElement('div');
            const checkBox = document.createElement('button');
    
            toDoCardContainer.appendChild(toDoCard);
            toDoCard.appendChild(checkBox);
            toDoCard.appendChild(cardContentSubContainer);
            cardContentSubContainer.appendChild(cardDueDateAndPriority);
            cardContentSubContainer.appendChild(cardNameAndDescription);
    
            checkBox.textContent = '✓';
            
            toDoCard.classList.add('todo-card');
            checkBox.classList.add('todo-checkbox');
            cardContentSubContainer.classList.add('card-content-subcontainer');
            cardNameAndDescription.classList.add('card-name-and-description-container');
            cardDueDateAndPriority.classList.add('card-due-date-and-priority');
    
            let j = 0;

            for (const property in projectArr[currentProjectIndex].toDos[i]) {
                const toDoCardContent = document.createElement('div');
                const todoClassNamesArr = ['todo-name', 'todo-description', 'todo-due-date', 'todo-priority'];
                
                toDoCardContent.classList.add(todoClassNamesArr[j]);
                
                toDoCardContent.textContent = projectArr[currentProjectIndex].toDos[i][property];
                
                if (j < Object.keys(projectArr[currentProjectIndex].toDos[i]).length - 2) {
                    cardNameAndDescription.appendChild(toDoCardContent);
                    
                }
                if (j >= Object.keys(projectArr[currentProjectIndex].toDos[i]).length - 2) {
                    cardDueDateAndPriority.appendChild(toDoCardContent);
                }
                j++; 
            }
        }

    }
    
    
}

export  { displayToDoCard, cardArea, toDoCardAreaMain, toDoCardContainer, selectedProjectHeader} 
