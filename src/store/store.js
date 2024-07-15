import { createContext, useReducer } from "react";

export const CalendarContext = createContext();

const initialState = {
  visible: false,
 loading:false
};

function reducer(state, action) {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        visible: action.payload,
      };
    case "HIDE":
      return {
        ...state,
        visible: action.payload,
      };
      case "LOAD":
        return{
          ...state,loading: action.payload
        }

    default:
      return {
        ...state,
      };
  }
}

export function DataProvider({ children }) {
  const [{visible,loading}, dispatch] = useReducer(reducer, initialState);

  return (
    <CalendarContext.Provider value={ {visible,loading,dispatch}}>
      {children}
    </CalendarContext.Provider>
  );
}
