import React, { createContext, useState, useContext } from "react";
import { loginUser } from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem("@sorteio-admin:logged");

    return !!isLogged; //retorno lógico, verifica se tem conteúdo então é verdadeiro, caso não tenha então é falso
  });

  const signIn = async (email, password) => {
    const response = await loginUser(email, password);
    const { data: responseLogin = {} } = response;

    if (responseLogin && responseLogin.success) {
      const { data: { usuario: { login = ""} = {}, token = "" } = {} } = responseLogin;
      localStorage.setItem("@sorteio-admin:logged", "true");
      localStorage.setItem("@sorteio-admin:user", login);
      localStorage.setItem("@sorteio-admin:token", token);
      setLogged(true);
    } else {
      alert("Email ou senha inválido(s)!");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@sorteio-admin:logged");
    localStorage.removeItem("@sorteio-admin:user");
    localStorage.removeItem("@sorteio-admin:token");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
