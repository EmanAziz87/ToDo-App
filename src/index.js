import { displayNavMenu } from "./components/displayNavMenu/displayNavMenu";
import { header } from "./components/displayNavMenu/header/header";
import { cardArea } from "./components/displayToDoCard/displayToDoCard";
import { storageToDo } from "./components/manageToDo/manageToDo";

import './style.css';

header();
displayNavMenu();
cardArea();
storageToDo.addToDo();

