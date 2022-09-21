import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import {
  Container,
  Content,
  FieldContent,
  BtnConfirm,
  ContainerTicket,
  ContainerName,
  ContentLoader,
} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import { PAGE_LIST_CUSTOMER, states } from "../../constants";
import {
  createCustomer,
  findCustomer,
  updateCustomer,
} from "../../services/api";

const RegisterCustomer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerToEdit = searchParams.get("customerToEdit") || null;
  const [values, setValues] = useState({
    id: null,
    name: "",
    lastName: "",
    cpf: "",
    email: "",
    address: "",
    numberAddress: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [loading, setLoading] = useState(false);

  const loadCustomer = async () => {
    const response = await findCustomer(customerToEdit);
    const { data: responseFindCustomer = {} } = response;
    if (responseFindCustomer && responseFindCustomer.success) {
      const { cliente = {} } = responseFindCustomer;
      setValues({
        id: cliente.id,
        name: cliente.nome,
        lastName: cliente.sobrenome,
        cpf: cliente.cpf,
        email: cliente.email,
        address: cliente.endereco,
        numberAddress: cliente.numeroEndereco,
        neighborhood: cliente.bairro,
        complement: cliente.complemento,
        city: cliente.cidade,
        state: cliente.uf,
        zipcode: cliente.cep,
      });
    }
  };

  useEffect(() => {
    if (customerToEdit) {
      loadCustomer();
    }
  }, [customerToEdit]);

  const onChangeInput = (element) => {
    const inputName = element.name;
    const inputValue = element.value;

    setValues({ ...values, [inputName]: inputValue });
  };

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

  const saveCustomer = async () => {
    setLoading(true);

    const payload = {
      id: values.id,
      nome: values.name,
      sobrenome: values.lastName,
      email: values.email,
      endereco: values.address,
      numeroEndereco: values.numberAddress,
      bairro: values.neighborhood,
      complemento: values.complement,
      cidade: values.city,
      estado: values.state,
      cep: values.zipcode,
    };

    if (values.id) {
      const response = await updateCustomer(payload);
      const { data: responseUpdateCustomer = {} } = response;

      if (responseUpdateCustomer && responseUpdateCustomer.success) {
        setLoading(false);
        showToast("Cliente alterado com sucesso", "success");
        setTimeout(() => {
          navigate(PAGE_LIST_CUSTOMER);
        }, 2500);
      } else {
        setLoading(false);
        showToast("Falha ao tentar alterar o cliente", "error");
      }
    } else {
      const response = await createCustomer(payload);
      const { data: responseNewCustomer = {} } = response;

      if (responseNewCustomer && responseNewCustomer.success) {
        setLoading(false);
        showToast("Cliente criado com sucesso", "success");
        setTimeout(() => {
          navigate(PAGE_LIST_CUSTOMER);
        }, 2500);
      } else {
        setLoading(false);
        showToast("Falha ao tentar criar o cliente", "error");
      }
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
        title={values.id ? "Editar cliente" : "Novo cliente"}
        showFilters={false}
      />
      <Content>
        <ContainerName>
          <FieldContent>
            <label>Nome</label>
            <input
              id="iptNameField"
              name="name"
              type="text"
              autoCapitalize="words"
              className="input-name"
              //autoComplete="given-name"
              //maxLength={INPUT_MAX_LENGTH}
              //aria-label={labelFirstName}
              value={values.name || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>
          <FieldContent>
            <label>Sobrenome</label>
            <input
              id="iptLastNameField"
              name="lastName"
              type="text"
              autoCapitalize="words"
              className="input-name"
              //autoComplete="given-name"
              //maxLength={INPUT_MAX_LENGTH}
              //aria-label={labelFirstName}
              value={values.lastName || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>
        </ContainerName>
        <ContainerName>
          <FieldContent>
            <label>CPF</label>
            <input
              id="iptCPFField"
              name="cpf"
              type="text"
              autoCapitalize="words"
              className="input-cpf"
              //autoComplete="given-name"
              //maxLength={INPUT_MAX_LENGTH}
              //aria-label={labelFirstName}
              value={values.cpf || ""}
              disabled
            />
          </FieldContent>
          <FieldContent>
            <label>Email</label>
            <input
              id="iptEmailField"
              name="email"
              type="email"
              autoCapitalize="words"
              className="input-email"
              //autoComplete="given-name"
              //maxLength={INPUT_MAX_LENGTH}
              //aria-label={labelFirstName}
              value={values.email || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>
        </ContainerName>

        <FieldContent>
          <label>Endereço</label>
          <input
            id="iptAddressField"
            name="address"
            type="text"
            autoCapitalize="words"
            className="input-address"
            //autoComplete="given-name"
            //maxLength={INPUT_MAX_LENGTH}
            //aria-label={labelFirstName}
            value={values.address || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>

        <ContainerTicket>
          <FieldContent>
            <label>Número</label>
            <input
              id="iptNumberAddressField"
              name="numberAddress"
              type="text"
              className="input-address-number"
              value={values.numberAddress || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>
          <FieldContent>
            <label>Bairro</label>
            <input
              id="iptNeighborhoodField"
              name="neighborhood"
              type="text"
              className="input-neighborhood"
              value={values.neighborhood || ""}
              onChange={(event) => onChangeInput(event.target)}
            />
          </FieldContent>
        </ContainerTicket>
        <FieldContent>
          <label>Complemento</label>
          <input
            id="iptComplementField"
            name="complement"
            type="text"
            autoCapitalize="words"
            className="input-complement"
            //autoComplete="given-name"
            //maxLength={INPUT_MAX_LENGTH}
            //aria-label={labelFirstName}
            value={values.complement || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>
        <FieldContent>
          <label>Cidade</label>
          <input
            id="iptCityField"
            name="city"
            type="text"
            autoCapitalize="words"
            className="input-city"
            //autoComplete="given-name"
            //maxLength={INPUT_MAX_LENGTH}
            //aria-label={labelFirstName}
            value={values.city || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>
        <ContainerTicket>
        <FieldContent>
          <label>Estado</label>
          <select className="select-state" >
            {states.length > 0 && states.map((item, index) => (
              <option key={index} value={item.name} selected={item.name === values.state}>{item.name}</option>
            ))}
          </select>
        </FieldContent>
        <FieldContent>
          <label>Cep</label>
          <InputMask
            id="iptZipcodeField"
            name="zipcode"
            type="text"
            className="input-zipcode"
            mask="99999-999"
            //placeholder="DD/MM/AAAA"
            value={values.zipcode || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>
        </ContainerTicket>
        <BtnConfirm>
          <button onClick={() => saveCustomer()}>
            {values.id ? "Salvar" : "Criar"}
          </button>
        </BtnConfirm>
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default RegisterCustomer;
