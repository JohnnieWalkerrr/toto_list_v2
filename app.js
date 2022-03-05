// Grab DOM elements

const done_btn = document.querySelector('.btn-done');
const remove_btn = document.querySelector('.btn-remove');

class UI {
    static showTasks() {
        // const ala_ls = ['task one', 'task two', 'task three'];

        const tasksArray = Store.getTasks();

        tasksArray.forEach(task => UI.addTaskToList(task));
    }

    static addTaskToList(task) {
        const task_output = document.querySelector('.tasks-section');

        task_output.innerHTML += `
            <div class="task-el input-group-text">
                <input class="form-control new-task-input" readonly type="text" value="${task}" />
                <button class='btn-done button btn btn-outline-success' type="submit">Done</button>
                <button class='btn-remove btn btn-outline-danger' type="submit">Remove</button>
            </div>
        `;
    }

    static deleteTask(task) {
        if (task.classList.contains('btn-remove')) {
            task.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        const fullClassName = `alert-${className}`;
        div.className = fullClassName;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.new-task-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert-danger').remove(), 1500);
    }

    static clearInput() {
        document.querySelector('.new-task-input').value = '';
    }
}

class Store {
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static deleteTask() {
        const tasks = Store.getTasks();
        tasks.forEach((task, index) => {
            tasks.splice(index, 1);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Event: Display tasks
document.addEventListener('DOMContentLoaded', UI.showTasks);

// Add task to UI
document.querySelector('.btn-add').addEventListener('click', e => {
    e.preventDefault();
    const task_text = document.querySelector('.new-task-input').value;
    if (task_text == '') {
        UI.showAlert('Add something', 'danger');
    } else {
        UI.addTaskToList(task_text);
        Store.addTask(task_text);
    }

    // Clear input
    UI.clearInput();
});

// Event: Delete task
document.querySelector('.tasks-section').addEventListener('click', e => {
    Store.deleteTask();
    UI.deleteTask(e.target);
});

// todo storage, edit, save etc
