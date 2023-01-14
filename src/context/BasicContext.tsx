import { createContext, useState } from "react";

export const UserContext = createContext<string>("");
export const UpdateUserContext = createContext<any>(null);

export function BasicContextProvider({ children }: any) {
  const [user, setUser] = useState("Jesse Hall");

  const changeFunction = (name: string) => {
    setUser(name);
  };

  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={changeFunction}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
}
