
function receiveUserInput() {
    const toDo = prompt('what do you need to get done?');
    const description = prompt('describe it');
    const dueDate = prompt('when should you finish it by?');
    const priority = prompt('priority level?');

    return [toDo, description, dueDate, priority];
}

export { receiveUserInput }