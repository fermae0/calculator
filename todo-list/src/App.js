import React, { Component } from "react";
import Header from "./header";
import { getFilteredTasks }from "./taskfilters";
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from "./localstorage";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks:[],
            inputText:"",
            nextId:1,
            filter: "All",
            activeButton :"All"
        }
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this)
    }

    componentDidMount() {
        const {tasks, nextId} = loadTasksFromLocalStorage();
        this.setState({tasks,nextId});

    }
    inputchange = (event) => {
        this.setState({ inputText: event.target.value });
    };
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.addTask();
        }
    }
    addTask = () => {
        const taskDescription = this.state.inputText.trim(); 

        if (taskDescription === "") {
            return;
        }
        const newTask = {
            id:this.state.nextId,
            text:taskDescription,
            completed:false
        };

            this.setState(prevState => ({
                tasks: [...prevState.tasks, newTask],
                nextId:prevState.nextId + 1,
                inputText:''
            }),
            () => {
                saveTasksToLocalStorage(this.state.tasks)
            }
        );
        }
        deleteTask = (id) => {
            this.setState(prevState => ({
              tasks: prevState.tasks.filter(task => task.id !== id)
            }),
            () => {
                saveTasksToLocalStorage(this.state.tasks)
            }
        );
    }
    toggleTaskCompletion = (id) => {
        const updatedTasks = this.state.tasks.map((task) => {
            if(task.id === id) {
                return {...task, completed: !task.completed}
            }
            return task;
        })

        this.setState({tasks: updatedTasks}, () => {
            saveTasksToLocalStorage(this.state.tasks)
        })
    }
    setFilter = (filter) => {
        this.setState({ filter, activeButton: filter })
    }
    clearAllTasks = () => {
        this.setState({tasks: [], nextId:1 }, () => {
            saveTasksToLocalStorage(this.state.tasks);
        })
    }

    render() {
        const filteredTasks = getFilteredTasks(this.state.tasks, this.state.filter);

        return (
            <div>
                <Header title="Todo-list"/>
                    <div id="addtask">
                        <input placeholder="Create a new todo..." className="input-add" type="text" value={this.state.inputText} onChange={this.inputchange} onKeyPress={this.handleKeyPress} maxLength="47"/>
                        <button id="btn-add" onClick={() => this.addTask(this.state.inputText)}>+</button>
                    </div>
                    <div className="main">
                    <div>
                        <button className={`filter-button ${this.state.activeButton === "All" ? "active" : ""}`} onClick={() => this.setFilter("All")}>All</button>
                        <button className={`filter-button ${this.state.activeButton === "Active" ? "active" : ""}`} onClick={() => this.setFilter("Active")}>Active</button>
                        <button className={`filter-button ${this.state.activeButton === "Completed" ? "active" : ""}`} onClick={() => this.setFilter("Completed")}>Completed</button>
                        <button className={`clear-button`} onClick={this.clearAllTasks}>Clear all</button>
                    </div>
                    <div className="tasks">
                    <ul>
                        {filteredTasks.map(task => (
                        <li key={task.id} className="task">
                            <label className="checkbox-container">
                            <input type="checkbox" checked={task.completed} onChange={() => this.toggleTaskCompletion(task.id)}/>
                            <span className="checkmark"></span>
                            </label>
                            <label className="text" htmlFor={`task${App.id}`}>{task.text}</label>
                            <div className="button-background">
                                <button className="btn-delete" onClick={() => this.deleteTask(task.id)}>
                                <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                </button>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        )
    }
    }
export default App;