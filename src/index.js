import { displayNavMenu } from "./components/displayNavMenu/displayNavMenu";
import { displayToDoCard } from "./components/displayToDoCard/displayToDoCard";
import { storageToDo } from "./components/storeToDo/storeToDo"

import './style.css';

console.log(storageToDo.toDoStorage());
displayNavMenu();
displayToDoCard();