import { storageToDo } from '../../manageToDo/manageToDo';
import { navMenuReappear } from '../displayNavMenu';
import './header.css';
import svgThreeLines from './three-horizontal-lines-icon.svg';

const mainContainer = document.querySelector('#content'); 


function header() {
    const headerContainer = document.createElement('header');
    const threeHoriztonalLineIcon = document.createElement('img');
    const headerTitleContainer = document.createElement('div');
    const headerTitle = document.createElement('p');
    
    threeHoriztonalLineIcon.src = svgThreeLines;
    headerTitle.textContent = 'Todo or NotTodo'

    headerContainer.classList.add('header-container');
    threeHoriztonalLineIcon.classList.add('header-menu-icon');
    headerTitleContainer.classList.add('header-title-container');
    headerTitle.classList.add('header-title');

    mainContainer.appendChild(headerContainer);
    headerContainer.appendChild(threeHoriztonalLineIcon);
    headerContainer.appendChild(headerTitleContainer);
    headerTitleContainer.appendChild(headerTitle);

    threeHoriztonalLineIcon.addEventListener('click', function() {
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) {
            navMenuReappear();
            storageToDo.addToDo();
        } else {
            while (navContainer.firstChild) {
                navContainer.removeChild(navContainer.lastChild);
                if (!navContainer.firstChild) {
                    navContainer.remove();
                }
            }
        }
    });

}

export { header }