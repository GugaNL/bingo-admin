import React from "react";
import { Container, SubTitle, Controllers } from "./styles";
import SelectionFilter from "../SelectionFilter";
import { months, years } from "../../constants";

const ContentHeader = (props) => {
  const { title = "", showFilters = "" } = props;
  return (
    <Container>
      <SubTitle>{title}</SubTitle>
      {showFilters && (
        <Controllers>
          <SelectionFilter arrayOptions={months} />
          <SelectionFilter arrayOptions={years} />
        </Controllers>
      )}
    </Container>
  );
};

export default ContentHeader;
