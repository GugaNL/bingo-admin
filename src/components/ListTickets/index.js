import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import {
  ContentLoader,
  ContentLegends,
  SquareLegend,
  ContentSearch,
  ContentNumbers,
  SquareNumber,
} from "./styles";
import { listTicketsWhere, searchTicket } from "../../services/api";

const ListTickets = (props) => {
  const { sorteioId = 0, totalTickets = 0 } = props;
  const [tickets, setTickets] = useState([]);
  const [initialTickets, setInitialTickets] = useState([]);
  const [filteredOption, setFilteredOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [freeNumbers, setFreeNumbers] = useState([]);
  const [buyedNumbers, setBuyedNumbers] = useState([]);
  const [reservedNumbers, setReservedNumbers] = useState([]);
  const [canceledNumbers, setCanceledNumbers] = useState([]);

  const mountArrayTotalTickets = (ticketsArray = []) => {
    let initialTicketsArray = [];
    for (let i = 0; i < totalTickets; i++) {
      initialTicketsArray.push({ numero: i, status: "livre" });
    }

    ticketsArray.forEach((item) => {
      initialTicketsArray[item.numero].status = item.status;
    });

    setTickets(initialTicketsArray);
    setInitialTickets(initialTicketsArray);

    const filteredFree =
      initialTicketsArray.filter((item) => item.status === "livre") || [];
    setFreeNumbers(filteredFree);
  };

  const countStatus = (ticketsArray = []) => {
    const filteredReserved =
      ticketsArray.filter((item) => item.status === "reservado") || [];
    const filteredBuyed =
      ticketsArray.filter((item) => item.status === "comprado") || [];
    const filteredCanceled =
      ticketsArray.filter((item) => item.status === "cancelado") || [];

    setReservedNumbers(filteredReserved);
    setBuyedNumbers(filteredBuyed);
    setCanceledNumbers(filteredCanceled);
  };

  const fetchTicketList = async () => {
    const response = await listTicketsWhere(sorteioId, null, page, limit);
    const { data: responseListTickets = {} } = response;

    if (responseListTickets && responseListTickets.success) {
      const { bilhetes = [] } = responseListTickets;
      //bilhetes.sort((a, b) => a.numero - b.numero);
      mountArrayTotalTickets(bilhetes);
      countStatus(bilhetes);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Falha ao listar os números", {
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
    fetchTicketList();
  }, []);

  const handleStatusColor = (status) => {
    let statusColor = "gray";

    if (status === "livre") {
      statusColor = "lightGray";
    } else if (status === "reservado") {
      statusColor = "orange";
    } else if (status === "comprado") {
      statusColor = "green";
    } else {
      statusColor = "red";
    }
    return statusColor;
  };

  const filterLegend = (selectedStatus) => {
    setLoading(true);

    if (showEmpty) {
      setShowEmpty(false);
    }

    if (selectedStatus === "free") {
      if (freeNumbers === tickets) {
        setTickets(initialTickets);
        setFilteredOption("");
      } else {
        setTickets(freeNumbers);
        setFilteredOption("free");
      }
    } else if (selectedStatus === "buyed") {
      if (buyedNumbers === tickets) {
        setTickets(initialTickets);
        setFilteredOption("");
      } else {
        setTickets(buyedNumbers);
        setFilteredOption("buyed");
      }
    } else if (selectedStatus === "reserved") {
      if (reservedNumbers === tickets) {
        setTickets(initialTickets);
        setFilteredOption("");
      } else {
        setTickets(reservedNumbers);
        setFilteredOption("reserved");
      }
    } else if (selectedStatus === "canceled") {
      if (canceledNumbers === tickets) {
        setTickets(initialTickets);
        setFilteredOption("");
      } else {
        setTickets(canceledNumbers);
        setFilteredOption("canceled");
      }
    }

    setLoading(false);
  };

  const handleSearch = (element) => {
    setSearchTerm(element?.value);

    // const reg = /^\d+\.?\d{0,2}?$/;
    // if (reg.test(element?.value)) {
    //   setSearchTerm(element?.value);
    // }
  };

  const fetchSearchNumber = async () => {
    if (searchTerm) {
      const findNumber = tickets.find(item => item.numero === parseInt(searchTerm)) || {};
      setTickets([findNumber]);
      setActiveSearch(true);
    }

    //setTickets([{ numero: findNumber}]);

    // if (searchTerm) {
    //   setLoading(true);
    //   setActiveSearch(true);
    //   const response = await searchTicket(searchTerm, sorteioId);
    //   const { data: responseTicket = {} } = response;

    //   if (responseTicket && responseTicket.success) {
    //     const { bilhete = {} } = responseTicket;
    //     setTickets([{ numero: bilhete?.numero, status: bilhete?.status }]);
    //     setLoading(false);
    //   } else {
    //     setTickets([]);
    //     setShowEmpty(true);
    //     setLoading(false);
    //   }
    // }
  };

  const clearSearch = () => {
    setActiveSearch(false);
    setSearchTerm("");
    setTickets(initialTickets);
  };

  return (
    <>
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
      <ContentLegends>
        <SquareLegend
          colorStatus="lightGray"
          selected={filteredOption === "free" ? true : false}
          onClick={() => filterLegend("free")}
        >
          Livre ({freeNumbers.length})
        </SquareLegend>
        <SquareLegend
          colorStatus="green"
          selected={filteredOption === "buyed" ? true : false}
          onClick={() => filterLegend("buyed")}
        >
          Comprado ({buyedNumbers.length})
        </SquareLegend>
        <SquareLegend
          colorStatus="orange"
          selected={filteredOption === "reserved" ? true : false}
          onClick={() => filterLegend("reserved")}
        >
          Reservado ({reservedNumbers.length})
        </SquareLegend>
        <SquareLegend
          colorStatus="red"
          selected={filteredOption === "canceled" ? true : false}
          onClick={() => filterLegend("canceled")}
        >
          Cancelado ({canceledNumbers.length})
        </SquareLegend>
      </ContentLegends>

      <ContentSearch>
        <input
          id="iptSearchField"
          name="search"
          pattern="[0-9]*"
          className="input-search"
          //maxLength={INPUT_MAX_LENGTH}
          placeholder="Buscar"
          value={searchTerm}
          onChange={(evt) => handleSearch(evt.target)}
        />
        <button onClick={() => fetchSearchNumber()}>
          <FaSearch />
        </button>
        {activeSearch && searchTerm && (
          <button onClick={() => clearSearch()}>
            <FaTrash />
          </button>
        )}
      </ContentSearch>

      <ContentNumbers>
        {tickets.length > 0 &&
          tickets.map((item, index) => {
            let statusColor = handleStatusColor(item.status);
            if (item.numero === 0) return null;

            return (
              <SquareNumber colorStatus={statusColor} key={index}>
                {item.numero}
              </SquareNumber>
            );
          })}
      </ContentNumbers>
      <ToastContainer />
    </>
  );
};

export default ListTickets;
