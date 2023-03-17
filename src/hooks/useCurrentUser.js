import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  return {
    currentUser,
    setCurrentUser,
  };
};
export default useCurrentUser;
