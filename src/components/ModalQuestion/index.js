import React from "react";
import { FaTimes } from "react-icons/fa";
import {
  Container,
  Content,
  Header,
  Title,
  Body,
  Footer,
  ContentButtons,
} from "./styles";

const ModalQuestion = (props) => {
  const {
    handleCloseModal,
    handleConfirm,
    title = "",
    description = "",
    textBtnConfirm = "Ok",
  } = props;

  return (
    <Container>
      <Content>
        <Header>
          <Title>{title}</Title>
          <FaTimes onClick={() => handleCloseModal()} />
        </Header>
        <Body>{description}</Body>
        <Footer>
          <ContentButtons>
            <button className="button-confirm" onClick={() => handleConfirm()}>
              {textBtnConfirm}
            </button>
            <button
              className="button-cancel"
              onClick={() => handleCloseModal()}
            >
              Cancelar
            </button>
          </ContentButtons>
        </Footer>
      </Content>
    </Container>
  );
};

export default ModalQuestion;
