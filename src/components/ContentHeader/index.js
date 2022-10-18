import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Container, SubTitle, Controllers, ButtonFilter } from "./styles";
import SelectionFilter from "../SelectionFilter";
import { months, years } from "../../constants";

const ContentHeader = (props) => {
  const { title = "", showFilters = "" } = props;
  const [disableFilters, setDisableFilters] = useState(false);

  return (
    <Container>
      <SubTitle>{title}</SubTitle>
      {showFilters && (
        <Controllers>
          <ButtonFilter onClick={() => setDisableFilters(!disableFilters)}>
            <FaFilter />
          </ButtonFilter>
          {!disableFilters && (
            <>
              <SelectionFilter arrayOptions={months} type="month" />
              <SelectionFilter arrayOptions={years} type="year" />
            </>
          )}
        </Controllers>
      )}
    </Container>
  );
};

export default ContentHeader;
