import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const Login = (userData) => {
    const { id, email, name } = userData;
    setUser({ id, email, name });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        Login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
