import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import { Container, Content, ContentLoader } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import CardListCustomer from "../../components/CardListCustomer";
import { useAuth } from "../../hooks/auth";
import { listCustomers } from "../../services/api";

const ListCustomers = () => {
  const { signOut } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const response = await listCustomers();
    const { data: responseListCustomers = {} } = response;

    if (responseListCustomers && responseListCustomers.success) {
      setLoading(false);
      const { clientes = [] } = responseListCustomers;
      setCustomers(clientes);
    } else {
      setLoading(false);
      if (response === 401) {
        //Colocar o modal nformando falha na autenticação // Criar um context pra colocar o modal
        signOut();
      } else {
        toast.error("Falha ao listar os clientes", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filterList = (filterStatus) => {
    if (filterStatus === appliedFilter) {
      setCustomers(customers);
      setAppliedFilter("");
    } else {
      setAppliedFilter(filterStatus);
      const filteredList = customers.filter(
        (item) => item.status === filterStatus
      );
      setCustomers(filteredList);
    }
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
      <ContentHeader title="Clientes" showFilters={false} />
      <Content>
        {customers.length > 0 &&
          customers.map((item, index) => (
            <CardListCustomer item={item} key={index} />
          ))}
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default ListCustomers;
