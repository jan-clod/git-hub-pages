type StateType = {
  age: number;
  children: number;
  name: string;
};
type ActionType = {
  type: string;
  [key: string]: any;
};

export const userReduser = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT-AGE":
        return {...state, age: state.age + 1}
    case "INCREMENT-CHILDREN-COUNT":
        return {...state, children: state.children + 1} 
    default:
      throw new Error("i dont't understand this action type");
  }
};
