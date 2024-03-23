import { createContext } from "react";

const AuthContext = createContext({
  id: 0,
  setId: () => {}
});

export { AuthContext };
