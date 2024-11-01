// Seleziona gli elementi dalla pagina
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Aggiungi un evento di click al pulsante "Aggiungi"
addTaskButton.addEventListener('click', addTask);

// Funzione per aggiungere una nuova attività
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Aggiungi il pulsante di eliminazione
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
        });

        // Aggiungi la possibilità di segnare l'attività come completata
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        // Pulisce il campo di input
        taskInput.value = '';
    }
}
