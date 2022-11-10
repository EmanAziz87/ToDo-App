import { recycleThroughTodos } from '../../displayToDoCard/displayToDoCard';
import { projectsArr, storageToDo } from '../../manageToDo/manageToDo';
import './header.css';

const mainContainer = document.querySelector('#content'); 


function header() {
    const headerContainer = document.createElement('header');
    const headerTitleContainer = document.createElement('div');
    const headerTitle = document.createElement('p');
    

    headerTitle.textContent = 'Todo or NotTodo'

    headerContainer.classList.add('header-container');
    headerTitleContainer.classList.add('header-title-container');
    headerTitle.classList.add('header-title');

    mainContainer.appendChild(headerContainer);
    headerContainer.appendChild(headerTitleContainer);
    headerTitleContainer.appendChild(headerTitle);


}

export { header }