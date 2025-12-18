const taskInput = document.getElementById('task-input');
        const addTaskButton = document.getElementById('add-task');
        const taskList = document.getElementById('task-list');

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.completed) {
                    li.classList.add('completed');
                }
                li.addEventListener('click', () => {
                    task.completed = !task.completed;
                    saveTasks();
                    renderTasks();
                });
                const deleteButton = document.createElement('span');
                deleteButton.textContent = '❌';
                deleteButton.classList.add('delete');
                deleteButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                });
                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        addTaskButton.addEventListener('click', () => {
            if (taskInput.value) {
                tasks.push({ text: taskInput.value, completed: false });
                taskInput.value = '';
                saveTasks();
                renderTasks();
            }
        });

        renderTasks();