import { receiveUserInput } from "../receiveUserInput.js/receiveUserInput";

// const [toDo, description, dueDate, priority] = receiveUserInput();

function storeToDo(name, description, dueDate, priority) {

    const toDoObject = {
        name: name,
        description: description,
        dueDate: dueDate,
        priority: priority,
    }

    function toDoStorage() {
        const thingsToDo = [];
        thingsToDo.push(toDoObject);
        return thingsToDo;
    }

    return { toDoStorage }
}

// const aToDo = storeToDo(toDo, description, dueDate, priority);

const storageToDo = storeToDo('toDo', 'description', 'dueDate', 'priority');


export { storageToDo }

