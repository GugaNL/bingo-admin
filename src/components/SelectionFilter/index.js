import React from "react";
import { Container } from "./styles";

const SelectionFilter = (props) => {
  const { arrayOptions = [] } = props;

  return (
    <Container>
      <select>
        {arrayOptions.map((item) => (
          <option value={item.value}>{item.name}</option>
        ))}
      </select>
    </Container>
  );
};

export default SelectionFilter;
