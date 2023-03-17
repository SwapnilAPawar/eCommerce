import { createContext, useEffect, useReducer } from "react";

let reducer = (info, newInfo) => {
  return { ...info, ...newInfo };
};
const initialState = {};
const localState = JSON.parse(localStorage.getItem("usercontent"));
const UserContext = createContext();
const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useReducer(reducer, localState || initialState);
  useEffect(() => {
    localStorage.setItem("usercontent", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
