import { Delete } from '@mui/icons-material';
import { Button, Checkbox, IconButton } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const removeTodoListHandler = () => props.removeTodoList(props.todolistID)
    const addTaskHandler = (NewTitle: string) => props.addTask(props.todolistID, NewTitle)
    const updateTaskHandler = () => { }
    return <div>
        <h3>
            {props.title}
            <IconButton onClick={removeTodoListHandler}>
                <Delete />
            </IconButton>
        </h3>

        <AddItemForm addItem={addTaskHandler} />

        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(props.todolistID, t.id, newValue);
                    }
                    return <p key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color="success"
                            onChange={onChangeStatusHandler}
                            checked={t.isDone} />
                        <EditableSpan
                            title={t.title}
                            onChange={onChangeTitleHandler}
                        />
                        <button onClick={onClickHandler}>x</button>
                    </p>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                onClick={onAllClickHandler}>All</Button>
            <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}

