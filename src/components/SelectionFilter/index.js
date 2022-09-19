import React from "react";
import { Container } from "./styles";

const SelectionFilter = (props) => {
  const { arrayOptions = [] } = props;

  return (
    <Container>
      <select>
        {arrayOptions.map((item, index) => (
          <option value={item.value} key={index}>{item.name}</option>
        ))}
      </select>
    </Container>
  );
};

export default SelectionFilter;
