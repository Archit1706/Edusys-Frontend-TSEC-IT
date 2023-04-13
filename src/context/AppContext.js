import { createContext, useState } from "react";
import { signin, signup } from "./apis";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState(null);

  const login = async (userBody) => {
    const res = await signin(userBody);
    console.log(res);
    if (res.status === "success") {
      let data = res.data;
      localStorage.setItem("token", data.tokens.access.token);
      localStorage.setItem("expires", data.tokens.access.expires);
      localStorage.setItem("refreshToken", data.tokens.refresh.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsAuthenticated(true);
      setUser(data.user);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setLoginError(res.data.message);
    }
    return res;
  };

  const register = async (userBody) => {
    const res = await signup(userBody);
    if (res.status === "success") {
      let data = res.data;
      localStorage.setItem("token", data.tokens.access.token);
      localStorage.setItem("expires", data.tokens.access.expires);
      localStorage.setItem("refreshToken", data.tokens.refresh.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsAuthenticated(true);
      setUser(data.user);
    }
    return res;
  };

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loginError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
