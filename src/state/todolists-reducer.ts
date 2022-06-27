import { FilterValuesType } from "./../App";
import { v1 } from "uuid";
import { todolistsType } from "../App";

export type removeTodoListType = {
  type: "REMOVE-TODOLIST"
  id: string
};
export type addTodoListType = {
  type: "ADD-TODOLIST"
  title: string
  id: string
};
export type changeTodoListTitleType = {
  type: "CHANGE-TODOLIST-TITLE"
  id: string
  title: string
};
export type changeTodoListFilterType = {
  type: "CHANGE-TODOLIST-FILTER"
  id: string
  filter: FilterValuesType
};
type ActionsType =
  | removeTodoListType
  | addTodoListType
  | changeTodoListTitleType
  | changeTodoListFilterType;

export const todoListsReducer = (
  state: Array<todolistsType>,
  action: ActionsType
): todolistsType[] => {
  //типизация говорит что ф-н возвратит Array<todoListType>
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((el) => el.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          filtered: "all",
        },
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find((el) => el.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find((el) => el.id === action.id);
      if (todoList) {
        todoList.filtered = action.filter;
      }
      return [...state];
    }
    default:
      throw new Error("i dont't understand this action type");
  }
};

export const RemoveToDoListAC = (todoListId: string): removeTodoListType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
};
export const AddToDoListAC = (title: string): addTodoListType => {
  return { type: "ADD-TODOLIST", title, id: v1() };
};
export const ChangeToDoListTitleAC = (
  id: string,
  title: string
): changeTodoListTitleType => {
  return { type: "CHANGE-TODOLIST-TITLE",id, title };
};
export const ChangeToDoListFilterAC = (
  id: string,
  filter: FilterValuesType
): changeTodoListFilterType => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter };
};
