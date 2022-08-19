import React, { useMemo } from "react";
import { Container, TagColor, BtnCard } from "./styles";

const CardList = (props) => {
  const { item = {} } = props;
  const { status = "" } = item;

  const tagColor = useMemo(() => {
    let color = (props) => props.theme.color.danger;
    if (status === "IN_PROGRESS") {
      color = (props) => props.theme.color.green;
    } else if (status === "FINISHED") {
      color = (props) => props.theme.color.blue;
    }

    return color;
  }, [status]);

  return (
    <Container>
      <TagColor colorStatus={tagColor} />
      <BtnCard href="/register-sweepstake">
        <span>{item?.name}</span>
        <small>{item?.date}</small>
      </BtnCard>
      <h3>{item?.ticketSents} vendidos</h3>
    </Container>
  );
};

export default CardList;
