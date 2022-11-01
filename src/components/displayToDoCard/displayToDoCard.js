import { storageToDo } from '../storeToDo/storeToDo';
import './displayToDoCard.css';


function displayToDoCard() {
    const mainContent = document.querySelector('#content');
    const toDoCardAreaBackground = document.createElement('article');
    const toDoCardAreaMain = document.createElement('section');
    const toDoCard = document.createElement('div');

    toDoCardAreaBackground.classList.add('todo-card-area-background');
    toDoCardAreaMain.classList.add('todo-card-area-main');
    toDoCard.classList.add('todo-card');

    mainContent.appendChild(toDoCardAreaBackground);
    toDoCardAreaBackground.appendChild(toDoCardAreaMain);
    toDoCardAreaMain.appendChild(toDoCard);
}

export { displayToDoCard }
