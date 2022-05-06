import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { v1 } from 'uuid';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string
    title: string
    filtered: FilterValuesType
}
type tasksStateType = {
    [key: string]: Array<TaskType>
}
function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        { id: todolistID1, title: 'What to learn', filtered: 'all' },
        { id: todolistID2, title: 'What to buy', filtered: 'all' },
    ])
    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "moloko", isDone: true },
            { id: v1(), title: "hleb", isDone: true },
            { id: v1(), title: "grechka", isDone: false },
            { id: v1(), title: "maslo", isDone: false },
            { id: v1(), title: "vino", isDone: false },
        ]
    });
    function removeTask(todolistID: string, taskiId: string) {
        debugger
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskiId) })
    }  // наш весь массив, [переназначаем содержимое], id2.[id2].filter...  
    function addTask(todolistID: string, title: string) {
        debugger
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })
    }
    function changeStatus(todolistID: string, taskId: string, isDoneValue: boolean) {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone: isDoneValue } : el) })
    }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? { ...el, filtered: value } : el));
    }
    const removeTodoList = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodoList = (title: string) => {
        let newId = v1()
        let newTodolist: todolistsType = {
            id: newId,
            filtered: "all",
            title: title
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [newId]: [] })
    }
    const changeTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, title: newTitle } : el) })
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        To Do List
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed> {/* то что внутри выравнивается */}
                <Grid container style={{padding:"10px"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map(el => {

                        let tasksForTodolist = tasks[el.id];

                        if (el.filtered === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                        }
                        if (el.filtered === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                        }

                        return (<Grid item>
                            <Paper variant="outlined" style={{padding:"10px"}}>
                                <Todolist
                                    key={el.id}
                                    todolistID={el.id}
                                    title={el.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={el.filtered}
                                    removeTodoList={removeTodoList}
                                />
                            </Paper>
                        </Grid>

                        )
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default App;