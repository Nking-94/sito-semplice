// Seleziona gli elementi dalla pagina
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Funzione per aggiungere una nuova attività
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);

        // Salva l'attività nel local storage
        saveTasks();

        // Pulisce il campo di input
        taskInput.value = '';
    }
}

// Funzione per creare un elemento <li> per una nuova attività
function createTaskElement(taskText, completed = false) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    if (completed) {
        taskItem.classList.add('completed');
    }

    // Aggiungi il pulsante di eliminazione
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✖';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks(); // Aggiorna il salvataggio
    });

    // Aggiungi la possibilità di segnare l'attività come completata
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks(); // Aggiorna il salvataggio
    });

    taskItem.appendChild(deleteButton);
    return taskItem;
}

// Funzione per salvare le attività nel local storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push({
            text: taskItem.textContent.replace('✖', '').trim(),
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funzione per caricare le attività dal local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}

// Aggiungi un evento di click al pulsante "Aggiungi"
addTaskButton.addEventListener('click', addTask);

// Carica le attività al caricamento della pagina
document.addEventListener('DOMContentLoaded', loadTasks);

// Aggiungi i listener per i filtri
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        filterTasks(button.getAttribute('data-filter'));
    });
});

// Funzione per filtrare le attività
function filterTasks(filter) {
    taskList.querySelectorAll('li').forEach(taskItem => {
        switch (filter) {
            case 'all':
                taskItem.style.display = '';
                break;
            case 'completed':
                taskItem.style.display = taskItem.classList.contains('completed') ? '' : 'none';
                break;
            case 'incomplete':
                taskItem.style.display = taskItem.classList.contains('completed') ? 'none' : '';
                break;
        }
    });
}
