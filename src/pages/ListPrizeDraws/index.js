import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import { Container, Content, FiltersLegends, ContentLoader } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import CardList from "../../components/CardList";
import { listPrizeDraws } from "../../services/api";


const ListPrizeDraws = () => {
  const [prizeDraws, setPrizeDraws] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchList = async () => {
    const response = await listPrizeDraws();
    const { data: responseListPrizeDraws = { } } = response;

    if (responseListPrizeDraws && responseListPrizeDraws.success) {
      setLoading(false);
      const {sorteios = []} = responseListPrizeDraws;
      setPrizeDraws(sorteios);
    } else {
      setLoading(false);
      toast.error("Falha ao listar sorteios", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
     fetchList();
  }, []);

  const filterList = (filterStatus) => {
    // if (filterStatus === appliedFilter) {
    //   setPrizeDraws(sorteios);
    //   setAppliedFilter('');
    // } else {
    //   setAppliedFilter(filterStatus);
    //   const filteredList = sorteios.filter(
    //     (item) => item.status === filterStatus
    //   );
    //   setPrizeDraws(filteredList);
    // }
  };

  return (
    <Container>
      {loading && (
        <ContentLoader>
          <Puff
            height="200"
            width="200"
            radisu={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </ContentLoader>
      )}
      <ContentHeader title="Sorteios" showFilters />
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
        {prizeDraws.length > 0 && prizeDraws.map((item, index) => (
          <CardList item={item} key={index} />
        ))}
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default ListPrizeDraws;
