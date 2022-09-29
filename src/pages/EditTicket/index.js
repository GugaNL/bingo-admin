import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import {
  Container,
  Content,
  FieldContent,
  BtnConfirm,
  ContainerName,
  ContentLoader,
  BtnNumbers,

} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import { statusType, PAGE_LIST_PRIZE_DRAW } from "../../constants";
import { findTicket, findCustomer } from "../../services/api";

const EditTicket = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketNumber = searchParams.get("ticketNumber") || null;
  const sorteioId = searchParams.get("sorteioId") || null;
  const [values, setValues] = useState({
    id: null,
    number: null,
    status: null,
    buyer: null,
  });
  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const loadTicket = async () => {
    setLoading(true);

    const response = await findTicket(ticketNumber, sorteioId);
    const { data: responseFindTicket = {} } = response;

    if (responseFindTicket && responseFindTicket.success) {
      const { bilhete = {} } = responseFindTicket;

      const response = await findCustomer(bilhete.comprador);
      const { data: responseFindCustomer = {} } = response;

      if (responseFindCustomer && responseFindCustomer.success) {
        const { cliente = {} } = responseFindCustomer;

        setValues({
          id: bilhete.id,
          number: bilhete.numero,
          status: bilhete.status,
          buyer: cliente.nome + " " + cliente.sobrenome,
        });
        setLoading(false);
      } else {
        setLoading(false);
        showToast("Erro ao carregar bilhete", "error");
      }
    } else {
      setLoading(false);
      showToast("Erro ao carregar bilhete", "error");
    }
  };

  useEffect(() => {
    if (ticketNumber && sorteioId) {
      loadTicket();
    }
  }, [ticketNumber, sorteioId]);

  const onChangeInput = (element) => {
    const inputName = element.name;
    const inputValue = element.value;

    setValues({ ...values, [inputName]: inputValue });
  };

  const saveTicket = async () => {
    setLoading(true);

    const payload = {
      id: values.id,
      status: values.status,
      comprador: values.buyer,
    };

    if (values.id) {
      // const response = await updateCustomer(payload);
      // const { data: responseUpdateCustomer = {} } = response;
      // if (responseUpdateCustomer && responseUpdateCustomer.success) {
      //   setLoading(false);
      //   showToast("Cliente alterado com sucesso", "success");
      //   setTimeout(() => {
      //     navigate(PAGE_LIST_CUSTOMER);
      //   }, 2500);
      // } else {
      //   setLoading(false);
      //   showToast("Falha ao tentar alterar o cliente", "error");
      // }
    } else {
      // const response = await createCustomer(payload);
      // const { data: responseNewCustomer = {} } = response;
      // if (responseNewCustomer && responseNewCustomer.success) {
      //   setLoading(false);
      //   showToast("Cliente criado com sucesso", "success");
      //   setTimeout(() => {
      //     navigate(PAGE_LIST_CUSTOMER);
      //   }, 2500);
      // } else {
      //   setLoading(false);
      //   showToast("Falha ao tentar criar o cliente", "error");
      // }
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
      <ContentHeader
        title={values.id ? "Editar bilhete" : "Novo bilhete"}
        showFilters={false}
      />
      <BtnNumbers>
        <button onClick={() => navigate(PAGE_LIST_PRIZE_DRAW)}>
          <FaArrowLeft />
          Voltar
        </button>
      </BtnNumbers>
      <Content>
        <ContainerName>
          <FieldContent>
            <label>Número</label>
            <input
              id="iptNumberField"
              name="number"
              type="text"
              autoCapitalize="words"
              className="input-address-number"
              //maxLength={INPUT_MAX_LENGTH}
              disabled
              value={values.number || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>
          <FieldContent>
            <label>Status</label>
            <select className="select-state" disabled>
              {statusType.length > 0 &&
                statusType.map((item, index) => (
                  <option
                    key={index}
                    value={item.name}
                    selected={item.name === values.status}
                  >
                    {item.title}
                  </option>
                ))}
            </select>
            {/* <input
              id="iptStatusField"
              name="status"
              type="text"
              autoCapitalize="words"
              className="input-cpf"
              //maxLength={INPUT_MAX_LENGTH}
              value={values.status || ""}
              onChange={(event) => onChangeInput(event.target)}
            /> */}
          </FieldContent>
        </ContainerName>
        <ContainerName>
          <FieldContent>
            <label>Comprador</label>
            <input
              id="iptBuyerField"
              name="buyer"
              type="text"
              autoCapitalize="words"
              className="input-name"
              //maxLength={INPUT_MAX_LENGTH}
              value={values.buyer || ""}
              disabled
            />
          </FieldContent>
        </ContainerName>

        <BtnConfirm>
          <button onClick={() => saveTicket()}>
            {values.number ? "Salvar" : "Criar"}
          </button>
        </BtnConfirm>
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default EditTicket;
