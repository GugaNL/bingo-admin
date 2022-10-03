import React, { useState } from "react";
import { Container } from "./styles";
//Components
import Aside from "../Aside";
import Header from "../Header";
import Content from "../Content";
import ModalQuestion from "../ModalQuestion";
//Context
import { CheckAuthContext } from "../../contexts";
//Hook
import { useAuth } from "../../hooks/auth";

const Layout = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);
  const { signOut } = useAuth();

  return (
    <Container>
      {!isLogged && (
        <ModalQuestion
          title="Erro no acesso"
          description="Falha na autenticação, faça o login novamente"
          textBtnConfirm="OK"
          handleConfirm={() => signOut()}
          handleCloseModal={() => signOut()}
          showCancelBtn={false}
        />
      )}
      <Aside />
      <Header />
      <CheckAuthContext.Provider value={{ setIsLogged, isLogged }}>
        <Content>{children}</Content>
      </CheckAuthContext.Provider>
    </Container>
  );
};

export default Layout;
