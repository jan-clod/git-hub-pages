import { userReduser } from "./user-reducer";

test("user reducer should increment only age", () => {
  const startState = { age: 20, children: 2, name: "Dimych" }; //стартовые данные

  const endState = userReduser(startState, { type: "INCREMENT-AGE" }); //используем стартовый стейт в фн

  expect(endState?.age).toBe(21); //пишем что ожидаем получить
  expect(endState?.children).toBe(2);
});

test("user reducer should increment only children", () => {
    const startState = {age: 20, children: 2, name:'Dimych'}

    const endState = userReduser(startState,{type:"INCREMENT-CHILDREN-COUNT"})

    expect(endState?.age).toBe(20)
    expect(endState.children).toBe(3)
});

