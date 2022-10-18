import React from "react";
import { Container } from "./styles";

const SelectionFilter = (props) => {
  const { arrayOptions = [], type = "" } = props;
  let currentDate = new Date();

  if (type === "month") {
    currentDate = new Date().getMonth() + 1;
    //currentDate = currentDate.toLocaleString('pt-BR', {month: 'long'}); //Month name
  } else if (type === "year") {
    currentDate = new Date().getFullYear();
  }


  return (
    <Container>
      <select>
        {arrayOptions.map((item, index) => (
          <option value={item.value} key={index} selected={item.value === currentDate}>{item.name}</option>
        ))}
      </select>
    </Container>
  );
};

export default SelectionFilter;
