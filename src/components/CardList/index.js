import React, { useMemo } from "react";
import { Container, TagColor, BtnCard } from "./styles";

const CardList = (props) => {
  const { item = {} } = props;
  const { status = "" } = item;

  const tagColor = useMemo(() => {
    let color = (props) => props.theme.color.danger;
    if (status === 'ativo') {
      color = (props) => props.theme.color.green;
    } else if (status === 'finalizado') {
      color = (props) => props.theme.color.blue;
    }

    return color;
  }, [status]);

  const formatDate = (rawDate) => {
    const stringDate = rawDate.split('T')[0];
    const formattedStringDate = stringDate?.split('-').reverse().join('/');

    return formattedStringDate;
  };

  return (
    <Container>
      <TagColor colorStatus={tagColor} />
      <BtnCard href="/register-sweepstake">
        <span>{item?.titulo}</span>
        <small>{item?.data && formatDate(item.data)}</small>
      </BtnCard>
      <h3>{item?.bilhetesVendidos} vendidos</h3>
    </Container>
  );
};

export default CardList;
