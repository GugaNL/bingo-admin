import React, { useMemo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Container, TagColor, BtnCard } from "./styles";
import { PAGE_NEW_PRIZE_DRAW } from "../../constants";
import { formatDate } from "../../utils/helpers";

const CardList = (props) => {
  const { item = {} } = props;
  const { status = "" } = item;
  const navigate = useNavigate();

  const tagColor = useMemo(() => {
    let color = (props) => props.theme.color.danger;
    if (status === "ativo") {
      color = (props) => props.theme.color.green;
    } else if (status === "finalizado") {
      color = (props) => props.theme.color.blue;
    }

    return color;
  }, [status]);

  return (
    <Container
      onClick={() =>
        navigate({
          pathname: PAGE_NEW_PRIZE_DRAW,
          search: createSearchParams({ prizeDrawToEdit: item.id }).toString(),
        })
      }
    >
      <TagColor colorStatus={tagColor} />
      <BtnCard>
        <span>{item?.titulo}</span>
        <small>{item?.data && formatDate(item.data)}</small>
      </BtnCard>
      <h3>{item?.bilhetesVendidos} vendidos</h3>
    </Container>
  );
};

export default CardList;
