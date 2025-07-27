import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuth: false,
  setIsAuth: (auth: boolean) => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(document.cookie !== '');
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
