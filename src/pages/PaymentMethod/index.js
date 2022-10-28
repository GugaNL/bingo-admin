import React, { useState, useEffect, useContext } from "react";
import { CheckAuthContext } from "../../contexts";
import {
  Container,
  ContentLoader,
  ContainerName,
  FieldContent,
  BtnConfirm,
} from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Puff } from "react-loader-spinner";
import ContentHeader from "../../components/ContentHeader";
import {
  createPaymentInfo,
  updatePaymentInfo,
  findPaymentMethod,
} from "../../services/api";

const PaymentMethod = () => {
  const { setIsLogged } = useContext(CheckAuthContext);
  const [values, setValues] = useState({
    id: "",
    paymentMethod: "",
    pixNumber: "",
    pixType: "",
    owner: "",
    bank: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchPaymentInfo = async () => {
    setLoading(true);
    const response = await findPaymentMethod();
    const { data: responseFindPaymentInfo = {} } = response;
    if (responseFindPaymentInfo && responseFindPaymentInfo.success) {
      const { paymentInfo = {} } = responseFindPaymentInfo;
      if (Object.keys(paymentInfo).length > 0) {
        setValues({
          id: paymentInfo.id,
          paymentMethod: paymentInfo.paymentMethod,
          pixType: paymentInfo.pixType,
          pixNumber: paymentInfo.paymentNumber,
          owner: paymentInfo.owner,
          bank: paymentInfo.bank,
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

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

  const savePaymentInfo = async () => {
    setLoading(true);
    if (values.id) {
      const responseUpdate = await updatePaymentInfo(values);
      const { data: responseUpdatePaymentInfo = {} } = responseUpdate;
      if (responseUpdatePaymentInfo && responseUpdatePaymentInfo.success) {
        setLoading(false);
        showToast("Informações de pagamento alteradas com sucesso", "success");
      } else {
        setLoading(false);
        if (responseUpdate === 401) {
          setIsLogged();
        } else {
          const errorMsg = responseUpdate
            ? responseUpdate
            : "Falha ao tentar alterar as informações";
          showToast(errorMsg, "error");
        }
      }
    } else {
      const responseSave = await createPaymentInfo(values);
      const { data: responseCreatePaymentInfo = {} } = responseSave;
      if (responseCreatePaymentInfo && responseCreatePaymentInfo.success) {
        setLoading(false);
        showToast("Informações de pagamento criadas com sucesso", "success");
      } else {
        setLoading(false);
        if (responseSave === 401) {
          setIsLogged();
        } else {
          const errorMsg = responseSave
            ? responseSave
            : "Falha ao tentar criar as informações";
          showToast(errorMsg, "error");
        }
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
        title="Configurações"
        showFilters={false}
      />
      <ContainerName>
        <FieldContent>
          <label>Tipo de pagamento</label>
          <input
            id="iptPaymentMethod"
            name="paymentMethod"
            type="text"
            autoCapitalize="words"
            className="input-name"
            value={values.paymentMethod || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>
      </ContainerName>

      <ContainerName>
        <FieldContent>
          <label>Tipo da chave pix</label>
          <input
            id="iptPixType"
            name="pixType"
            type="text"
            autoCapitalize="words"
            className="input-name"
            value={values.pixType || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>

        <FieldContent>
          <label>Número</label>
          <input
            id="iptPixNumber"
            name="pixNumber"
            type="text"
            autoCapitalize="words"
            className="input-name"
            value={values.pixNumber || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>
      </ContainerName>

      <FieldContent>
        <label>Banco</label>
        <input
          id="iptBank"
          name="bank"
          type="text"
          autoCapitalize="words"
          className="input-name"
          value={values.bank || ""}
          onChange={(event) => onChangeInput(event.target)}
        />
      </FieldContent>

      <FieldContent>
        <label>Titular</label>
        <input
          id="iptOwner"
          name="owner"
          type="text"
          autoCapitalize="words"
          className="input-address"
          value={values.owner || ""}
          onChange={(event) => onChangeInput(event.target)}
        />
      </FieldContent>
      <BtnConfirm>
        <button onClick={() => savePaymentInfo()}>Salvar</button>
      </BtnConfirm>
      <ToastContainer />
    </Container>
  );
};

export default PaymentMethod;
