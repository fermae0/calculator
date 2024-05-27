export const getFilteredTasks = (tasks, filter) => {
    if (filter === "Active") {
        return tasks.filter((task) => !task.completed);
    }
    else if (filter === "Completed") {
        return tasks.filter((task) => task.completed);
    }
    return tasks;
}