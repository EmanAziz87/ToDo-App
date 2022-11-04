import { storageToDo, thingsToDo } from '../manageToDo/manageToDo';
import './displayToDoCard.css';

const mainContent = document.querySelector('#content');
const toDoCardAreaBackground = document.createElement('article');
const toDoCardAreaMain = document.createElement('section');

function cardArea () {
    toDoCardAreaBackground.classList.add('todo-card-area-background');
    toDoCardAreaMain.classList.add('todo-card-area-main');
    mainContent.appendChild(toDoCardAreaBackground);
    toDoCardAreaBackground.appendChild(toDoCardAreaMain);
};

function displayToDoCard() {
    (function displayInputtedCards () {
        for (let i = 0; i < thingsToDo.length; i++ ) {
            const toDoCard = document.createElement('div');
            const cardContentSubContainer = document.createElement('div');
            const cardNameAndDescription = document.createElement('div');
            const cardDueDateAndPriority = document.createElement('div');
            const checkBox = document.createElement('button');

            toDoCardAreaMain.appendChild(toDoCard);
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
            for (const property in thingsToDo[i]) {
                const toDoCardContent = document.createElement('div');
                const todoClassNamesArr = ['todo-name', 'todo-description', 'todo-due-date', 'todo-priority'];
                
                toDoCardContent.classList.add(todoClassNamesArr[j]);
                
                toDoCardContent.textContent = thingsToDo[i][property];
                
                if (j < Object.keys(thingsToDo[i]).length - 2) {
                    cardNameAndDescription.appendChild(toDoCardContent);
                    
                }
                if (j >= Object.keys(thingsToDo[i]).length - 2) {
                    cardDueDateAndPriority.appendChild(toDoCardContent);
                }
                j++; 
            }

        }
      })();
    
}

export  { displayToDoCard, cardArea} 