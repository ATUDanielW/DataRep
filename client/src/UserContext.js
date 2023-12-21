import { createContext, useState } from "react";

export const UserContext = createContext({});
const [userInfo, setUserInfo] = useState({});

export function UserContextProvider({ children }) {
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}