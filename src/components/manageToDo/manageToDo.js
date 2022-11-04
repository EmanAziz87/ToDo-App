import { displayToDoCard } from "../displayToDoCard/displayToDoCard";

let thingsToDo = [];
let userInputArr = [];

function manageToDo() {
    
    function storeInputAsObject(userInputs) {
        const toDoObject = {
            name: userInputs[0],
            description: userInputs[1],
            dueDate: userInputs[2],
            priority: userInputs[3],
        }
        return toDoObject;
    }

    function toDoStorage(toDoObject) {
        thingsToDo.push(toDoObject);
    }

    function addToDo() {
        const navAddToDoButton = document.querySelector('.nav-add-todo-button');
        const navContainer = document.querySelector('.nav-container');
        let toDoFormVisibility = false;
        navAddToDoButton.addEventListener('click', () => {
            if (!toDoFormVisibility) {
                toDoFormVisibility = true;
                const formContainer = document.createElement('form');
                const formFieldSet = document.createElement('fieldset');
                const formLegend = document.createElement('legend');
        
                const toDoNameLabel = document.createElement('label');
                const toDoNameInput = document.createElement('input');
                const toDoDescriptionLabel = document.createElement('label');
                const toDoDescriptionInput = document.createElement('input');
                const toDoDueDateLabel = document.createElement('label');
                const toDoDueDateInput = document.createElement('input');
                const toDoPriorityLabel = document.createElement('label');
                const toDoPrioritySelect = document.createElement('select');
                const toDoPriorityHigh = document.createElement('option');
                const toDoPriorityMid = document.createElement('option');
                const toDoPriorityLow = document.createElement('option');
        
                const todoSubmitButton = document.createElement('input');
                

                toDoNameLabel.textContent = 'Name:';
                toDoNameLabel.setAttribute('for', 'form-name');
                toDoNameInput.setAttribute('type', 'text');
                toDoNameInput.setAttribute('id', 'form-name');
                toDoNameInput.setAttribute('name', 'form-name');
                toDoNameInput.setAttribute('placeholder', 'Write a task');
                toDoNameInput.setAttribute('required', '');
                
                toDoDescriptionLabel.textContent = 'Description:';
                toDoDescriptionLabel.setAttribute('for', 'form-description');
                toDoDescriptionInput.setAttribute('type', 'text');
                toDoDescriptionInput.setAttribute('id', 'form-description');
                toDoDescriptionInput.setAttribute('name', 'form-description');
                toDoDescriptionInput.setAttribute('placeholder', 'Describe your task');
                toDoDescriptionInput.setAttribute('required', '');
                
                toDoDueDateLabel.textContent = 'Due Date:';
                toDoDueDateLabel.setAttribute('for', 'form-due-date');
                toDoDueDateInput.setAttribute('type', 'date');
                toDoDueDateInput.setAttribute('id', 'form-due-date');
                toDoDueDateInput.setAttribute('name', 'form-due-date');
                toDoDueDateInput.setAttribute('placeholder', 'When is it due?');
                toDoDueDateInput.setAttribute('required', '');
        
                toDoPriorityLabel.textContent = 'Priority:';
                toDoPriorityLabel.setAttribute('for', 'form-priority');
                toDoPrioritySelect.setAttribute('id', 'form-priority');
                toDoPrioritySelect.setAttribute('name', 'form-priority');
                toDoPrioritySelect.setAttribute('placeholder', 'Priority Level');
                toDoPrioritySelect.setAttribute('required', '');
                toDoPriorityHigh.setAttribute('value', 'High');
                toDoPriorityMid.setAttribute('value', 'Mid');
                toDoPriorityLow.setAttribute('value', 'low');
        
                todoSubmitButton.setAttribute('type', 'submit');
                todoSubmitButton.setAttribute('value', 'Add');
        
                toDoPriorityHigh.textContent = 'High';
                toDoPriorityMid.textContent = 'Mid';
                toDoPriorityLow.textContent = 'Low';
        
                formLegend.textContent = 'Add ToDo:';
                
                formContainer.classList.add('form-container');
                formFieldSet.classList.add('form-fieldset');
        
                navContainer.appendChild(formContainer);
                formContainer.appendChild(formFieldSet);
                formFieldSet.appendChild(formLegend);
                formFieldSet.appendChild(toDoNameLabel);
                formFieldSet.appendChild(toDoNameInput);
                formFieldSet.appendChild(toDoDescriptionLabel);
                formFieldSet.appendChild(toDoDescriptionInput);
                formFieldSet.appendChild(toDoDueDateLabel);
                formFieldSet.appendChild(toDoDueDateInput);
                formFieldSet.appendChild(toDoPriorityLabel);
                formFieldSet.appendChild(toDoPrioritySelect);
                toDoPrioritySelect.appendChild(toDoPriorityHigh);
                toDoPrioritySelect.appendChild(toDoPriorityMid);
                toDoPrioritySelect.appendChild(toDoPriorityLow);
                formFieldSet.appendChild(todoSubmitButton);
                
                todoSubmitButton.addEventListener('click', function(e) {
                    if (toDoDescriptionInput.value && toDoNameInput.value && toDoDueDateInput.value && toDoPrioritySelect.value) {
                        userInputArr.push(toDoNameInput.value);
                        userInputArr.push(toDoDescriptionInput.value);
                        userInputArr.push(toDoDueDateInput.value);
                        userInputArr.push(toDoPrioritySelect.value);
                        storageToDo.toDoStorage(storageToDo.storeInputAsObject(userInputArr));
                        displayToDoCard();
                        
                        while (formContainer.firstChild) {
                            formContainer.removeChild(formContainer.lastChild);
                        }
        
                        console.log(thingsToDo);
                        toDoFormVisibility = false;
                        thingsToDo = [];
                        userInputArr = [];
                    } 
                });
            }
        });
    }

    return { toDoStorage, addToDo, storeInputAsObject}
}

const storageToDo = manageToDo();

export { storageToDo, thingsToDo }

