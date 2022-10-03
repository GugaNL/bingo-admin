import React, { useState, useEffect, useContext } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
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
import {CheckAuthContext} from "../../contexts";
import ContentHeader from "../../components/ContentHeader";
import ModalQuestion from "../../components/ModalQuestion";
import { statusType, PAGE_NEW_PRIZE_DRAW } from "../../constants";
import {
  findTicket,
  findCustomer,
  updateTicket,
  removeTicket,
} from "../../services/api";

const EditTicket = () => {
  const { setIsLogged } = useContext(CheckAuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketNumber = searchParams.get("ticketNumber") || null;
  const sorteioId = searchParams.get("sorteioId") || null;
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    id: null,
    number: null,
    status: "",
    buyer: null,
    buyerId: null,
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
          buyerId: cliente.id,
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
    if (values.status === "livre") {
      setShowModal(true);
    } else {
      setLoading(true);

      const payload = {
        id: values.id,
        numero: values.number,
        status: values.status,
        sorteioId: sorteioId,
        comprador: values.buyerId,
      };

      if (values.id) {
        const response = await updateTicket(payload);
        const { data: responseUpdateTicket = {} } = response;
        if (responseUpdateTicket && responseUpdateTicket.success) {
          setLoading(false);
          showToast("Bilhete alterado com sucesso", "success");
          setEditMode(false);
        } else {
          setLoading(false);
          if (response === 401) {
            setIsLogged();
          } else{
            const errorMsg = response
            ? response
            : "Falha ao tentar alterar o bilhete";
          showToast(errorMsg, "error");
          }
        }
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
    }
  };

  const deleteTicket = async () => {
    if (values.id) {
      setLoading(true);

      const response = await removeTicket(values.id);
      const { data: responseRemoveTicket = {} } = response;

      if (responseRemoveTicket && responseRemoveTicket.success) {
        setShowModal(false);
        setLoading(false);
        showToast("Bilhete removido com sucesso", "success");
        setTimeout(() => {
          navigate({
            pathname: PAGE_NEW_PRIZE_DRAW,
            search: createSearchParams({ prizeDrawToEdit: sorteioId }).toString(),
          })
        }, 2500);
      } else {
        setShowModal(false);
        if (response === 401) {
          setIsLogged();
        } else {
          const errorMsg = response
          ? response
          : "Falha ao tentar remover o bilhete";
        showToast(errorMsg, "error");
        }
      }
    }
  };

  return (
    <Container>
      {showModal && (
        <ModalQuestion
          title="Aviso - Remoção de bilhete"
          description="O bilhete será excluído, tem certeza que deseja realizar a operação?"
          textBtnConfirm="Confirmar"
          handleConfirm={() => deleteTicket()}
          handleCloseModal={() => setShowModal(false)}
        />
      )}
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
        <button
          onClick={() =>
            navigate({
              pathname: PAGE_NEW_PRIZE_DRAW,
              search: createSearchParams({
                prizeDrawToEdit: sorteioId,
              }).toString(),
            })
          }
        >
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
            <select
              className="select-state"
              name="status"
              disabled={!editMode}
              value={values.status}
              onChange={(evt) => onChangeInput(evt.target)}
            >
              {statusType.length > 0 &&
                statusType.map((item, index) => (
                  <option
                    key={index}
                    value={item.name}
                    //selected={item.name === values.status}
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

        {values.number && (
          <BtnConfirm>
            <button
              className="button-edit"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancelar" : "Editar"}
            </button>
          </BtnConfirm>
        )}

        {editMode && (
          <BtnConfirm>
            <button className="button-save" onClick={() => saveTicket()}>
              {values.number ? "Salvar" : "Criar"}
            </button>
          </BtnConfirm>
        )}
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default EditTicket;
