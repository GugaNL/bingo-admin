import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Logo, Form, FormTitle } from "./styles";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

const Login = () => {
  const { signIn } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (element) => {
    const inputName = element.name;
    const inputValue = element.value;

    setValues({ ...values, [inputName]: inputValue });
  };

  const onLogin = async () => {
    await signIn(values.email, values.password);
  };

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Sorteio Admin" />
        <h2>Sorteio Admin</h2>
      </Logo>
      <Form>
        <FormTitle>Entrar</FormTitle>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
          onChange={(event) => onChangeInput(event.target)}
        ></Input>
        <Input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Senha"
          onChange={(event) => onChangeInput(event.target)}
        ></Input>
        <Button onClick={() => onLogin()}>Acessar</Button>
      </Form>
    </Container>
  );
};

export default Login;
