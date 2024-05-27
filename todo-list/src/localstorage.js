export const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const nextId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    return { tasks, nextId };
};

export const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};