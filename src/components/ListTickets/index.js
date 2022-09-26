import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import {
  Container,
  ContentLegends,
  SquareLegend,
  ContentNumbers,
  SquareNumber,
} from "./styles";
import { listTicketsWhere } from "../../services/api";

const ListTickets = (props) => {
  const { sorteioId = 0, totalTickets = 0 } = props;
  const [tickets, setTickets] = useState([]);
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
      initialTicketsArray.push({ number: i, status: "livre" });
    }

    ticketsArray.forEach((item) => {
      initialTicketsArray[item.numero].status = item.status;
    });

    setTickets(initialTicketsArray);

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
      mountArrayTotalTickets(bilhetes);
      countStatus(bilhetes);
      setLoading(false);
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

  return (
    <>
      <ContentLegends>
        <SquareLegend colorStatus="lightGray">
          Livre ({freeNumbers.length})
        </SquareLegend>
        <SquareLegend colorStatus="green">
          Comprado ({buyedNumbers.length})
        </SquareLegend>
        <SquareLegend colorStatus="orange">
          Reservado ({reservedNumbers.length})
        </SquareLegend>
        <SquareLegend colorStatus="red">
          Cancelado ({canceledNumbers.length})
        </SquareLegend>
      </ContentLegends>

      <ContentNumbers>
        {tickets.length > 0 &&
          tickets.map((item) => {
            let statusColor = handleStatusColor(item.status);

            return (
              <SquareNumber colorStatus={statusColor}>
                {item.number}
              </SquareNumber>
            );
          })}
      </ContentNumbers>
    </>
  );
};

export default ListTickets;
