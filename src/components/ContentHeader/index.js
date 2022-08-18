import React from "react";
import { Container, SubTitle, Controllers } from "./styles";
import SelectionFilter from '../SelectionFilter';
import {months, years} from '../../constants';

const ContentHeader = (props) => {
  const { title = 'Subtitulo genérico' } = props;
  return (
    <Container>
      <SubTitle>{title}</SubTitle>
      <Controllers>
        <SelectionFilter arrayOptions={months} />
        <SelectionFilter arrayOptions={years} />
      </Controllers>
    </Container>
  );
};

export default ContentHeader;
