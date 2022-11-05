import { displayNavMenu, navContainer } from '../displayNavMenu';
import './header.css';
import svgThreeLines from './three-horizontal-lines-icon.svg';

const mainContainer = document.querySelector('#content'); 


function header() {
    const headerContainer = document.createElement('header');
    const threeHoriztonalLineIcon = document.createElement('img');
    threeHoriztonalLineIcon.src = svgThreeLines;

    headerContainer.classList.add('header-container');
    threeHoriztonalLineIcon.classList.add('header-menu-icon');
    mainContainer.appendChild(headerContainer);
    headerContainer.appendChild(threeHoriztonalLineIcon);

    threeHoriztonalLineIcon.addEventListener('click', function() {
        const navContainer = document.querySelector('.nav-container');
        console.log(navContainer);
        if (!navContainer) {
            displayNavMenu();
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