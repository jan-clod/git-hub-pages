import { v1 } from "uuid";
import { tasksStateType } from "../App";
import { addTodoListType, removeTodoListType } from "./todolists-reducer";

type removeTaskActionType = {
    type: "REMOVE-TASK"
    todoListId: string
    taskId: string
};
type addTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}
type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todoListId: string
    taskId: string
    isDone: boolean
}
type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todoListId: string
    taskId: string
    title: string
}
type ActionType =
    | removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodoListType
    | removeTodoListType

export const tasksReducer = (state: tasksStateType, action: ActionType): tasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state }
            const filteredTasks = state[action.todoListId].filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = { ...state }
            const tasks = stateCopy[action.todoListId]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todoListId] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = { ...state }
            let task = stateCopy[action.todoListId].find(t => t.id === action.taskId)
            if (task) { task.isDone = action.isDone }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = { ...state }
            let task = stateCopy[action.todoListId].find(t => t.id === action.taskId)
            if (task) { task.title = action.title }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = { ...state }
            stateCopy[action.id] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("i dont't understand this action type");
    }
};

export const removeTaskAC = (taskId: string, todoListId: string)
    : removeTaskActionType => {
    return { type: "REMOVE-TASK", todoListId, taskId };
};
export const addTaskAC = (title: string, todoListId: string)
    : addTaskActionType => {
    return { type: "ADD-TASK", title, todoListId };
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string)
    : changeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", isDone, todoListId, taskId };
};
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string)
    : changeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", todoListId, taskId, title };
};