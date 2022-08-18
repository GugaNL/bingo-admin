import React, { useState } from "react";
import { Container, Content, FiltersLegends } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import CardList from "../../components/CardList";
//mock
import { sorteios } from "../../mocks";

const List = (props) => {
  const [sweepstake, setSweepstakes] = useState(sorteios) || [];
  const [appliedFilter, setAppliedFilter] = useState("");

  const filterList = (filterStatus) => {
    if (filterStatus === appliedFilter) {
      setSweepstakes(sorteios);
      setAppliedFilter('');
    } else {
      setAppliedFilter(filterStatus);
      const filteredList = sorteios.filter(
        (item) => item.status === filterStatus
      );
      setSweepstakes(filteredList);
    }
  };

  return (
    <Container>
      <ContentHeader title="Sorteios" />
      <FiltersLegends>
        <button
          type="button"
          className="filter-legend progress"
          onClick={() => filterList("IN_PROGRESS")}
        >
          Em andamento
        </button>
        <button
          type="button"
          className="filter-legend finished"
          onClick={() => filterList("FINISHED")}
        >
          Finalizado
        </button>
        <button
          type="button"
          className="filter-legend canceled"
          onClick={() => filterList("CANCELED")}
        >
          Cancelado
        </button>
      </FiltersLegends>
      <Content>
        {sweepstake.map((item) => (
          <CardList item={item} />
        ))}
      </Content>
    </Container>
  );
};

export default List;
