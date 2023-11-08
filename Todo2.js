submit.addEventListener('click', (e) => {
    e.preventDefault();
    let box1 = textbox1.value.trim();  
    let box2 = textbox2.value.trim();  

    // Check if both fields are not empty
    if (box1 !== "" && box2 !== "") {
        // Check if there's already a to-do list in localStorage
        let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

        // Add the new to-do item to the list
        todoList.push({ title: box1, description: box2 });

        // Store the updated list in localStorage
        localStorage.setItem('todoList', JSON.stringify(todoList));

        // Clear the input fields
        textbox1.value = "";
        textbox2.value = "";

        // Render the updated to-do list
        renderTodoList();
    }
});

function deleteTodoItem(index) {
    // Remove the selected to-do item from the list
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // Render the updated to-do list
    renderTodoList();
}

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Clear the entire to-do list in localStorage
    localStorage.removeItem('todoList');
    todo.innerHTML = ''; // Clear the HTML display as well
});

function renderTodoList() {
    // Retrieve the to-do list from localStorage
    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    // Generate the HTML for the to-do list
    let tableHtml = '<table><thead><th>Task</th><th>Description</th><th>Action</th></thead><tbody>';
    for (let i = 0; i < todoList.length; i++) {
        tableHtml += `
            <tr>
                <td>${todoList[i].title}</td>
                <td>${todoList[i].description}</td>
                <td class="icon"><button onclick="deleteTodoItem(${i})" class= "cross"><i class="fas fa-times" ></i></button></td>
            </tr>`;
    }
    tableHtml += '</tbody></table>';

    // Update the HTML display with the to-do list
    todo.innerHTML = tableHtml;
}

// Call the renderTodoList function when the page loads to populate the list
renderTodoList();
