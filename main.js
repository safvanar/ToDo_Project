// main.js

// Function to fetch and display user details
async function fetchAndDisplayTodoDetails() {
  const todoList = document.getElementById('todoListPend');
  const finishList = document.getElementById('todoListComp')
  try {
    const response = await axios.get('https://crudcrud.com/api/b0dc24d5ad964e19a3592a6162e9d82a/todoData');

    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }

    const todos = response.data;

    // Clear the existing list items
    todoList.innerHTML = '';
    finishList.innerHTML = '';
    // Iterate through the retrieved users and create list items with delete buttons
    todos.forEach(todo => {
      const listItem = document.createElement('li');
      listItem.textContent = `${todo.name}:${todo.desc}`;


      if( todo.status === false ){
        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(todo._id)); // Pass the user ID to the delete function

        // Create a finished button
        const finishButton = document.createElement('button');
        finishButton.classList = 'btn btn-success';
        finishButton.textContent = 'Finished';
        finishButton.addEventListener('click', () => markFinished(todo._id, todo.name, todo.desc)); // Pass the user ID to the delete function
        
        // Append the buttons to the list item
        listItem.appendChild(finishButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
      }else{

          // Create a delete button
          const deleteButton = document.createElement('button');
          deleteButton.classList = 'btn btn-danger';
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteTodo(todo._id)); // Pass the user ID to the delete function
          listItem.appendChild(deleteButton);
          finishList.appendChild(listItem);
      }
      
  
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to delete a user by ID
async function deleteTodo(todoId) {
  try {
    await axios.delete(`https://crudcrud.com/api/b0dc24d5ad964e19a3592a6162e9d82a/todoData/${todoId}`);
    fetchAndDisplayTodoDetails(); // Refresh the list after deleting
  } catch (error) {
    console.error('Error deleting ToDo:', error);
  }
}

async function markFinished(todoId, todoName, todoDesc) {
  try{
      const todoStatus = true
      await axios.put(`https://crudcrud.com/api/b0dc24d5ad964e19a3592a6162e9d82a/todoData/${todoId}`,{ name: todoName, desc: todoDesc, status: todoStatus });
      fetchAndDisplayTodoDetails();
  } catch (error) {
      console.error('Error marking finished:', error)
  }
}

// Event listener for form submission
document.getElementById('my-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('todoname').value;
  const desc = document.getElementById('tododesc').value;
  const status = false
  try {
    // Send user data to your API endpoint for storage
    await axios.post('https://crudcrud.com/api/b0dc24d5ad964e19a3592a6162e9d82a/todoData', { name: name, desc: desc, status: status });

    // Fetch and display updated user details
    fetchAndDisplayTodoDetails();

    // Clear the form fields
    document.getElementById('todoname').value = '';
    document.getElementById('tododesc').value = '';
  } catch (error) {
    console.error('Error submitting data:', error);
  }
});

// Call the fetchAndDisplayUserDetails function when the page loads
window.addEventListener('load', fetchAndDisplayTodoDetails);
