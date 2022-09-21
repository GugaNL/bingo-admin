import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Container, BtnCard } from "./styles";
import { PAGE_NEW_CUSTOMER } from "../../constants";

const CardListCustomer = (props) => {
  const { item = {} } = props;
  const navigate = useNavigate();


  return (
    <Container
      onClick={() =>
        navigate({
          pathname: PAGE_NEW_CUSTOMER,
          search: createSearchParams({ customerToEdit: item.id }).toString(),
        })
      }
    >
      <BtnCard>
        <span>{item?.nome} {item?.sobrenome}</span>
        <small>{item?.email}</small>
      </BtnCard>
      <h3>{item?.cidade}</h3>
    </Container>
  );
};

export default CardListCustomer;
