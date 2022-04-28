import React from "react";

export const UserContext = React.createContext({});

export const UserProvider = ({ user, children }: any) => {
    return (
        <UserContext.Provider
            value={{ user }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => React.useContext(UserContext);
