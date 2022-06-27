import { FilterValuesType } from "./../App";
import { v1 } from "uuid";
import { todolistsType } from "../App";
import {
  AddToDoListAC,
  ChangeToDoListFilterAC,
  ChangeToDoListTitleAC,
  RemoveToDoListAC,
  todoListsReducer,
} from "./todolists-reducer";

test("correct todoList should be removed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  const startState: Array<todolistsType> = [
    { id: todoListId1, title: "Want to Learn", filtered: "all" },
    { id: todoListId2, title: "Want to Buy", filtered: "all" },
  ];

  const action = RemoveToDoListAC(todoListId1);
  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: Array<todolistsType> = [
    { id: todoListId1, title: "What to learn", filtered: "all" },
    { id: todoListId2, title: "What to buy", filtered: "all" },
  ];

  const action = AddToDoListAC(newTodoListTitle);
  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodoListTitle);
  expect(endState[2].filtered).toBe("all");
});

test("correct todoList should change its name", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newTodoListTitle = "New TodoList";

  const startState: Array<todolistsType> = [
    { id: todoListId1, title: "What to learn", filtered: "all" },
    { id: todoListId2, title: "What to buy", filtered: "all" },
  ];

  const action = ChangeToDoListTitleAC(todoListId2, newTodoListTitle);

  const endState = todoListsReducer(startState, action);

  expect(endState[1].title).toBe(newTodoListTitle);
  expect(endState[0].title).toBe("What to learn");
});

test("correct filter of todoList should be changed", () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<todolistsType> = [
    { id: todoListId1, title: "What to learn", filtered: "all" },
    { id: todoListId2, title: "What to buy", filtered: "all" },
  ];

  const action = ChangeToDoListFilterAC(todoListId2, newFilter);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filtered).toBe("all");
  expect(endState[1].filtered).toBe(newFilter);
});