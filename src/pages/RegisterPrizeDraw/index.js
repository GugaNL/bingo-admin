import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeField from "react-simple-timefield";
import { Puff } from "react-loader-spinner";
import { FaChevronCircleDown, FaMinus, FaArrowLeft } from "react-icons/fa";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import {
  Container,
  Content,
  FieldContent,
  ContentInputDesc,
  ContentUploadImage,
  BtnDeleteImg,
  ContainerImagesUpload,
  BtnConfirm,
  BtnNumbers,
  ContainerTicket,
  ContentLoader,
} from "./styles";
import { CheckAuthContext } from "../../contexts";
import ContentHeader from "../../components/ContentHeader";
import ListTickets from "../../components/ListTickets";
import { PAGE_LIST_PRIZE_DRAW, ImageTypeRegex, baseURL } from "../../constants";
import {
  newPrizeDraw,
  findPrizeDraw,
  updatePrizeDraw,
  updateImages,
} from "../../services/api";

const RegisterPrizeDraw = () => {
  const { setIsLogged } = useContext(CheckAuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prizeDrawToEdit = searchParams.get("prizeDrawToEdit") || null;
  const [values, setValues] = useState({
    id: null,
    title: "",
    prize: "",
    datePrizeDraw: "",
    timePrizeDraw: "",
    prizeImages: [],
    prizeDescription: [{ id: 1, desc: "" }],
    ticketValue: 0,
    ticketQuantity: 0,
  });
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const fileRef = useRef();

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

  const loadPrizeDescription = (prizeDescription) => {
    const arrayDesc = prizeDescription?.split(";") || [];
    const formattedArrayDesc =
      arrayDesc.map((item, index) => {
        return { id: index + 1, desc: item };
      }) || [];
    return formattedArrayDesc;
  };

  const loadPrizeDraw = async () => {
    setLoading(true);
    const response = await findPrizeDraw(prizeDrawToEdit);
    const { data: responseFindPrizeDraw = {} } = response;
    if (responseFindPrizeDraw && responseFindPrizeDraw.success) {
      const { sorteio = {}, imagens = [] } = responseFindPrizeDraw;
      let prizeDate = "";
      let prizeTime = "";

      const prizeDescriptionFormatted = loadPrizeDescription(
        sorteio.descricao
      ) || [{ id: 1, desc: "" }];

      if (sorteio.data) {
        sorteio.data = new Date(sorteio.data).toLocaleString("pt-BR");
        prizeDate = sorteio.data.split(" ")[0];
        prizeTime = sorteio.data.split(" ")[1];
      }

      const formattedImages = imagens.map((el) => {
        return el.path;
      });

      setValues({
        id: sorteio.id,
        title: sorteio.titulo,
        prize: sorteio.premio,
        datePrizeDraw: prizeDate,
        timePrizeDraw: prizeTime,
        prizeDescription: prizeDescriptionFormatted,
        ticketValue: sorteio.valorBilhete,
        ticketQuantity: sorteio.totalBilhetes,
      });
      setUploadedImages(formattedImages);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prizeDrawToEdit) {
      loadPrizeDraw();
    }
  }, [prizeDrawToEdit]);

  const onChangeInput = (element, descId = null) => {
    const inputName = element.name;
    const inputValue = element.value;
    if (inputName === "prizeDescription") {
      setValues((prev) => {
        return {
          ...values,
          prizeDescription: [
            ...prev.prizeDescription.map((item) =>
              item.id === descId ? { ...item, desc: inputValue } : item
            ),
          ],
        };
      });
    } else if (inputName === "ticketQuantity" || inputName === "ticketValue") {
      const reg = /^\d+\.?\d{0,2}?$/;
      if (reg.test(inputValue) || inputValue === "") {
        setValues({ ...values, [inputName]: inputValue });
      }
    } else {
      setValues({ ...values, [inputName]: inputValue });
    }
  };

  const addFeature = () => {
    const lastId =
      values.prizeDescription[values.prizeDescription.length - 1]?.id;
    setValues((prev) => {
      return {
        ...values,
        prizeDescription: [
          ...prev.prizeDescription,
          { id: lastId + 1, desc: "" },
        ],
      };
    });
  };

  const removeFeature = (removeId) => {
    setValues((prev) => {
      return {
        ...values,
        prizeDescription: [
          ...prev.prizeDescription.filter((feat) => {
            return feat.id !== removeId;
          }),
        ],
      };
    });
  };

  const onImageChange = (evt) => {
    const { files = [] } = evt;
    if (files.length > 0 && files[0].type.match(ImageTypeRegex)) {
      return setImageFiles([...imageFiles, files[0]]);
    }
    alert("Apenas arquivos .jpeg ou .png");
  };

  const removeImage = (isUploadedImage = false, index) => {
    if (isUploadedImage) {
      let arrayAuxImages = uploadedImages;

      arrayAuxImages.splice(index, 1);
      setUploadedImages([...arrayAuxImages]);
    } else {
      let arrayAuxFiles = imageFiles;
      let arrayAuxImages = images;
  
      arrayAuxFiles.splice(index, 1);
      arrayAuxImages.splice(index, 1);
      setImageFiles([...arrayAuxFiles]);
      setImages([...arrayAuxImages]);
    }
  };

  const mountPrizeDesc = (desc) => {
    const formattedDesc =
      desc.map((item) => {
        return item.desc;
      }) || [];
    const stringDesc = formattedDesc.join(";") || "";
    return stringDesc;
  };

  const savePrizeDraw = async () => {
    setLoading(true);
    let formattedPrizeDesc = "";
    let formattedDate = values?.datePrizeDraw.split("/").reverse().join("-");

    if (values.timePrizeDraw) {
      formattedDate = formattedDate.concat(" ").concat(values.timePrizeDraw);
    }

    if (values.prizeDescription && values.prizeDescription.length > 0) {
      formattedPrizeDesc = mountPrizeDesc(values.prizeDescription);
    }

    const payload = {
      id: values.id,
      titulo: values.title,
      descricao: formattedPrizeDesc,
      data: formattedDate,
      premio: values.prize,
      totalBilhetes: values.ticketQuantity,
      valorBilhete: values.ticketValue,
      sorteioImages: imageFiles,
    };

    if (values.id) {
      const responseImage = await updateImages(uploadedImages, values.id); //first check if need delete some image
      if (responseImage === 401) {
        setLoading(false);
        return setIsLogged();
      }

      const response = await updatePrizeDraw(payload, images);
      const { data: responseUpdatePrizeDraw = {} } = response;

      if (responseUpdatePrizeDraw && responseUpdatePrizeDraw.success) {
        setLoading(false);
        showToast("Sorteio alterado com sucesso", "success");
        setTimeout(() => {
          navigate(PAGE_LIST_PRIZE_DRAW);
        }, 2500);
      } else {
        setLoading(false);
        if (response === 401) {
          setIsLogged();
        } else {
          showToast("Falha ao tentar alterar o sorteio", "error");
        }
      }
    } else {
      const response = await newPrizeDraw(payload);
      const { data: responseNewPrizeDraw = {} } = response;

      if (responseNewPrizeDraw && responseNewPrizeDraw.success) {
        setLoading(false);
        showToast("Sorteio criado com sucesso", "success");
        setTimeout(() => {
          navigate(PAGE_LIST_PRIZE_DRAW);
        }, 2500);
      } else {
        setLoading(false);
        if (response === 401) {
          setIsLogged();
        } else {
          showToast("Falha ao tentar criar o sorteio", "error");
        }
      }
    }
  };

  useEffect(() => {
    if (imageFiles.length < 1) return;

    const newImageUrls = [];
    imageFiles.forEach((itemImg) =>
      newImageUrls.push(URL.createObjectURL(itemImg))
    );
    setImages(newImageUrls);
  }, [imageFiles]);

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
        title={values.id ? "Editar Sorteio" : "Novo Sorteio"}
        showFilters={false}
      />
      <Content>
        {values.id && !showTickets && (
          <BtnNumbers>
            <button onClick={() => setShowTickets(true)}>
              Gerenciar n??meros
            </button>
          </BtnNumbers>
        )}
        {showTickets ? (
          <>
            <BtnNumbers>
              <button onClick={() => setShowTickets(false)}>
                <FaArrowLeft />
                Voltar
              </button>
            </BtnNumbers>
            <ListTickets
              sorteioId={values.id}
              totalTickets={values.ticketQuantity}
            />
          </>
        ) : (
          <>
            <FieldContent>
              <label>T??tulo do sorteio</label>
              <input
                id="iptTitleField"
                name="title"
                type="text"
                autoCapitalize="words"
                className="input-title"
                //autoComplete="given-name"
                //maxLength={INPUT_MAX_LENGTH}
                //className="input-field"
                //aria-label={labelFirstName}
                //placeholder="Texto que ser?? exibido"
                value={values.title || ""}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>
            <FieldContent>
              <label>Pr??mio</label>
              <input
                id="iptPrizeField"
                name="prize"
                type="text"
                autoCapitalize="words"
                className="input-prize"
                //autoComplete="given-name"
                //maxLength={INPUT_MAX_LENGTH}
                //aria-label={labelFirstName}
                //placeholder="Informe o pr??mio"
                value={values.prize || ""}
                onChange={(event) => onChangeInput(event.target)}
              />
            </FieldContent>

            <ContainerTicket>
              <FieldContent>
                <label>Data do sorteio</label>
                <InputMask
                  onChange={(event) => onChangeInput(event.target)}
                  value={values.datePrizeDraw || ""}
                  mask="99/99/9999"
                  name="datePrizeDraw"
                  type="text"
                  className="input-date-prize-draw"
                  id="iptDatePrizeDrawField"
                  placeholder="DD/MM/AAAA"
                />
              </FieldContent>
              <FieldContent>
                <label>Hor??rio do sorteio</label>
                <TimeField
                  id="iptTimePrizeDrawField"
                  name="timePrizeDraw"
                  value={values.timePrizeDraw}
                  onChange={(event) => onChangeInput(event.target)}
                  style={{
                    fontSize: 16,
                    width: 60,
                    padding: "6px",
                    color: "#333",
                    borderRadius: 5,
                  }}
                />
              </FieldContent>
            </ContainerTicket>
            <ContainerImagesUpload>
              {uploadedImages.length > 0 &&
                uploadedImages.map((imageSrc, index) => {
                  return (
                    <ContentUploadImage key={index}>
                      <img src={imageSrc} alt="imagem para upload" />
                      <BtnDeleteImg onClick={() => removeImage(true, index)}>
                        <MdDelete />
                      </BtnDeleteImg>
                    </ContentUploadImage>
                  );
                })}
              {images.length > 0 &&
                images.map((imageSrc, index) => {
                  return (
                    <ContentUploadImage key={index}>
                      <img src={imageSrc} alt="imagem para upload" />
                      <BtnDeleteImg onClick={() => removeImage(false, index)}>
                        <MdDelete />
                      </BtnDeleteImg>
                    </ContentUploadImage>
                  );
                })}
            </ContainerImagesUpload>

            <FieldContent>
              <label>Imagens</label>
              <input
                id="iptPrizeImageField"
                name="prizeImage"
                type="file"
                accept="image/*"
                multiple
                onChange={(evt) => onImageChange(evt.target)}
                hidden
                ref={fileRef}
              />
              <button
                className="btn-upload"
                onClick={() => fileRef.current.click()}
              >
                <MdCloudUpload />
              </button>
            </FieldContent>

            <FieldContent>
              <label>Caracter??sticas do pr??mio</label>
              {values.prizeDescription &&
                values.prizeDescription.length > 0 &&
                values.prizeDescription.map((item, index) => (
                  <div key={index}>
                    <ContentInputDesc>
                      {index > 0 && (
                        <button
                          className="btn-minus"
                          onClick={() => removeFeature(item.id)}
                        >
                          <FaMinus />
                        </button>
                      )}
                      <input
                        id="iptPrizeDescriptionField"
                        name="prizeDescription"
                        type="text"
                        autoCapitalize="words"
                        className="input-prize-desc"
                        //autoComplete="given-name"
                        //maxLength={INPUT_MAX_LENGTH}
                        //className="input-field"
                        //aria-label={labelFirstName}
                        //placeholder="Informe o pr??mio"
                        value={item.desc || ""}
                        onChange={(event) =>
                          onChangeInput(event.target, item.id)
                        }
                      />
                    </ContentInputDesc>
                  </div>
                ))}
              <button className="btn-add" onClick={() => addFeature()}>
                <FaChevronCircleDown />
              </button>
            </FieldContent>
            <ContainerTicket>
              <FieldContent>
                <label>Valor do bilhete</label>
                <input
                  id="iptTicketValueField"
                  name="ticketValue"
                  type="text"
                  pattern="[0-9]*"
                  className="input-date-prize-draw"
                  value={values.ticketValue || ""}
                  onChange={(event) => onChangeInput(event.target)}
                />
              </FieldContent>
              <FieldContent>
                <label>Total de bilhetes dispon??veis</label>
                <input
                  id="iptTotalTicketField"
                  name="ticketQuantity"
                  type="text"
                  //pattern='[0-9]'
                  className="input-date-prize-draw"
                  //placeholder="Total"
                  value={values.ticketQuantity || ""}
                  onChange={(event) => onChangeInput(event.target)}
                />
              </FieldContent>
            </ContainerTicket>
            <BtnConfirm>
              <button onClick={() => savePrizeDraw()}>
                {values.id ? "Salvar" : "Criar"}
              </button>
            </BtnConfirm>
          </>
        )}
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default RegisterPrizeDraw;
