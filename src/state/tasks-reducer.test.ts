import { v1 } from "uuid";
import { tasksStateType } from "../App";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { AddToDoListAC, RemoveToDoListAC } from "./todolists-reducer";

test("correct test should be deleted from correct array", () => {
  let startState: tasksStateType = {
    'todolistID1': [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: false },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    'todolistID2': [
      { id: "1", title: "moloko", isDone: true },
      { id: "2", title: "hleb", isDone: true },
      { id: "3", title: "grechka", isDone: false },
      { id: "4", title: "maslo", isDone: false },
      { id: "5", title: "vino", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "todolistID2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID1"].length).toBe(5);
  expect(endState["todolistID2"].length).toBe(4);
  expect(endState["todolistID2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct test should be added to correct array", () => {
  let startState: tasksStateType = {
    'todolistID1': [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: false },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    'todolistID2': [
      { id: "1", title: "moloko", isDone: true },
      { id: "2", title: "hleb", isDone: true },
      { id: "3", title: "grechka", isDone: false },
      { id: "4", title: "maslo", isDone: false },
      { id: "5", title: "vino", isDone: false },
    ],
  };

  const action = addTaskAC("juce", "todolistID2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID1"].length).toBe(5);
  expect(endState["todolistID2"].length).toBe(6);
  expect(endState["todolistID2"][0].id).toBeDefined();
  expect(endState["todolistID2"][0].title).toBe("juce");
  expect(endState["todolistID2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  let startState: tasksStateType = {
    'todolistID1': [
      { id: "1", title: "HTML&CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    'todolistID2': [
      { id: "1", title: "moloko", isDone: true },
      { id: "2", title: "hleb", isDone: true },
      { id: "3", title: "grechka", isDone: false },
      { id: "4", title: "maslo", isDone: false },
      { id: "5", title: "vino", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", false, "todolistID2");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"][1].isDone).toBeFalsy();
  expect(endState["todolistID1"][1].isDone).toBeTruthy();
});

test("title of specified task should be changed", () => {
  let startState: tasksStateType = {
    'todolistID1': [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: false },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    'todolistID2': [
      { id: "1", title: "moloko", isDone: true },
      { id: "2", title: "hleb", isDone: true },
      { id: "3", title: "grechka", isDone: false },
      { id: "4", title: "maslo", isDone: false },
      { id: "5", title: "vino", isDone: false },
    ],
  };

  const action = changeTaskTitleAC( "todoListID2","2", "milkyway");
  const endState = tasksReducer(startState, action);

  expect(endState["todolistID2"][1].title).toBe("milkyway");
  expect(endState["todolistID1"][1].title).toBe("JS");
});

test("new property array should be added when new todoList is added", () => { 
  let startState: tasksStateType = {
    'todolistID1': [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: false },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    'todolistID2': [
      { id: "1", title: "moloko", isDone: true },
      { id: "2", title: "hleb", isDone: true },
      { id: "3", title: "grechka", isDone: false },
      { id: "4", title: "maslo", isDone: false },
      { id: "5", title: "vino", isDone: false },
    ],
  };
  const action = AddToDoListAC("new");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistID1' && k !== 'todolistID2');
  if (!newKey) {
    throw Error("wqe");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todoListId should be deleted", () => { 
    let startState: tasksStateType = {
      'todolistID1': [
        { id: "1", title: "HTML&CSS", isDone: true },
        { id: "2", title: "JS", isDone: false },
        { id: "3", title: "ReactJS", isDone: false },
        { id: "4", title: "Rest API", isDone: false },
        { id: "5", title: "GraphQL", isDone: false },
      ],
      'todolistID2': [
        { id: "1", title: "moloko", isDone: true },
        { id: "2", title: "hleb", isDone: true },
        { id: "3", title: "grechka", isDone: false },
        { id: "4", title: "maslo", isDone: false },
        { id: "5", title: "vino", isDone: false },
      ],
    };
    const action = RemoveToDoListAC("todolistID2");
    const endState = tasksReducer(startState, action);
  
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistID2']).not.toBeDefined()
  });
