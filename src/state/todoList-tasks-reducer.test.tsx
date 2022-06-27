import { tasksStateType, todolistsType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { AddToDoListAC, todoListsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: tasksStateType = {}
    const startTodoListState: todolistsType[] = []

    const action = AddToDoListAC("new");
    const endTaskState = tasksReducer(startTasksState, action);
    const endTodoListState = todoListsReducer(startTodoListState, action);

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodoLists).toBe(action.id)
})