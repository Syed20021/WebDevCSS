// Kyan M 100892329, Syed Hassnat Ali 100835471
// router.js
"use strict";

(function (core) {
    class Router {
        constructor() {
            this.m_activeLink = "";
            this.m_routingTable = [];
        }

        get ActiveLink() {
            return this.m_activeLink;
        }

        set ActiveLink(link) {
            this.m_activeLink = link;
        }

        Add(route) {
            this.m_routingTable.push(route);
        }

        AddTable(routingTable) {
            this.m_routingTable = routingTable;
        }

        Find(route) {
            return this.m_routingTable.indexOf(route);
        }

        Remove(route) {
            let index = this.Find(route);
            if (index > -1) {
                this.m_routingTable.splice(index, 1);
                return true;
            }
            return false;
        }

        ToString() {
            return this.m_routingTable.toString();
        }

        Route() {
            let activeLink = location.pathname; // Get the path
            this.ActiveLink = (activeLink === "/") ? "home" : activeLink.replace("/", "");

            if (this.Find(this.ActiveLink) > -1) {
                switch (this.ActiveLink) {
                    case "home":
                        // Implement DisplayHome() function
                        break;
                    case "task-list":
                        if (authGuard()) {
                            DisplayTaskList();
                        } else {
                            this.Redirect("/login");
                        }
                        break;
                    case "404":
                        // Implement Display404() function
                        break;
                    // Add other cases as needed
                }
            } else {
                this.ActiveLink = "404";
                // Implement Display404() function
            }
        }

        Redirect(route) {
            location.pathname = route;
            this.Route();
        }
    }

    core.Router = Router;
})(core);

let tasks = []; // Global tasks array

function authGuard() {
    const userToken = sessionStorage.getItem('userToken');
    return userToken !== null;
}

function addTask() {
    const taskTextInput = document.getElementById('taskTextInput');
    const taskTitle = taskTextInput.value.trim();
    if (taskTitle) {
        const newTask = { id: Date.now(), title: taskTitle };
        tasks.push(newTask);
        taskTextInput.value = '';
        DisplayTaskList();
    }
}

function editTask(taskId) {
    console.log('Edit task with id:', taskId);
    // Add the edit task functionality here
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    DisplayTaskList();
}

function DisplayTaskList() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = ''; // Clear the current task list

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.id = `task-${task.id}`;

        const span = document.createElement('span');
        span.textContent = task.title;

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-outline-primary btn-sm editButton';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.onclick = () => editTask(task.id);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger btn-sm deleteButton';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.onclick = () => deleteTask(task.id);

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'float-end';
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(buttonGroup);

        taskListElement.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let router = new core.Router();
    router.AddTable(["/", "/home", "/about", "/services", "/contact", "/contact-list", "/projects", "/register", "/login", "/edit", "/task-list"]);
    
    if (router.ActiveLink === "task-list" && authGuard()) {
        document.getElementById('newTaskButton').addEventListener('click', addTask);
        DisplayTaskList(); // Call this on page load to display tasks
    } else if (router.ActiveLink === "login" && !authGuard()) {
        // Redirect to login or display the login page
    }
});
