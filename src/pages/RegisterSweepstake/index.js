import React, { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeField from "react-simple-timefield";
import { FaChevronCircleDown, FaMinus } from "react-icons/fa";
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
  ContainerTicket,
} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import { ImageTypeRegex } from "../../constants";
import { newPrizeDraw } from "../../services/api";

const RegisterSweepstake = (props) => {
  const [values, setValues] = useState({
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
  const [imageFiles, setImageFiles] = useState([]);
  const fileRef = useRef();

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
      if (reg.test(inputValue)) {
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

  // useEffect(() => {
  //   if (images.length < 1) return;
  //   const newImagesURLs = [];
  //   images.forEach(image => newImagesURLs.push(URL.createObjectURL(image)));
  //   setImagesURLs(newImagesURLs);
  // }, [images])

  // const onImageChange = (evt) => {
  //   setImages([...images, evt?.files]);
  //   setImagesURLs(URL.createObjectURL(evt?.files[0]));
  // };

  const onImageChange = (evt) => {
    const { files = [] } = evt;
    if (files.length > 0 && files[0].type.match(ImageTypeRegex)) {
      return setImageFiles([...imageFiles, files[0]]);
    }
    alert("Apenas arquivos .jpeg ou .png");
  };

  const removeImage = (index) => {
    let arrayAuxFiles = imageFiles;
    let arrayAuxImages = images;

    arrayAuxFiles.splice(index, 1);
    arrayAuxImages.splice(index, 1);
    setImageFiles([...arrayAuxFiles]);
    setImages([...arrayAuxImages]);
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
    let formattedPrizeDesc = "";
    let formattedDate = values?.datePrizeDraw.split("/").reverse().join("-");

    if (values.timePrizeDraw) {
      formattedDate = formattedDate.concat(" ").concat(values.timePrizeDraw);
    }

    if (values.prizeDescription && values.prizeDescription.length > 0) {
      formattedPrizeDesc = mountPrizeDesc(values.prizeDescription);
    }

    const payload = {
      titulo: values.title,
      descricao: formattedPrizeDesc,
      data: formattedDate,
      premio: values.prize,
      totalBilhetes: values.ticketQuantity,
      valorBilhete: values.ticketValue,
    };

    const response = await newPrizeDraw(payload);

    const { data: responseNewPrizeDraw = {} } = response;

    if (responseNewPrizeDraw && responseNewPrizeDraw.success) {
      toast.success("Sorteio criado com sucesso", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Falha ao tentar criar o sorteio", {
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

  useEffect(() => {
    const images = [];
    const fileReaders = [];
    let isCancel = false;

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages([...images]);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }

    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles, images]);

  return (
    <Container>
      <ContentHeader title="Novo Sorteio" showFilters={false} />
      <Content>
        <FieldContent>
          <label>Título do sorteio</label>
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
            //placeholder="Texto que será exibido"
            value={values.title || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>
        <FieldContent>
          <label>Prêmio</label>
          <input
            id="iptPrizeField"
            name="prize"
            type="text"
            autoCapitalize="words"
            className="input-prize"
            //autoComplete="given-name"
            //maxLength={INPUT_MAX_LENGTH}
            //aria-label={labelFirstName}
            //placeholder="Informe o prêmio"
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
            <label>Horário do sorteio</label>
            {/* <input
              id="iptTimePrizeDrawField"
              name="timePrizeDraw"
              type="time"
              //pattern="[0-9]{2}:[0-9]{2}"
              className="input-date-prize-draw"
              value={values.timePrizeDraw}
              onChange={(event) => onChangeInput(event.target)}
            /> */}
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
          {images.length > 0 &&
            images.map((imageSrc, index) => (
              <ContentUploadImage key={index}>
                <img src={imageSrc} alt="imagem para upload" />
                <BtnDeleteImg onClick={() => removeImage(index)}>
                  <MdDelete />
                </BtnDeleteImg>
              </ContentUploadImage>
            ))}
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
            //value={values.prizeImages || ""}
          />
          <button
            className="btn-upload"
            onClick={() => fileRef.current.click()}
          >
            <MdCloudUpload />
          </button>
        </FieldContent>

        <FieldContent>
          <label>Características do prêmio</label>
          {values.prizeDescription.length > 0 &&
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
                    //placeholder="Informe o prêmio"
                    value={item.desc || ""}
                    onChange={(event) => onChangeInput(event.target, item.id)}
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
            <label>Total de bilhetes disponíveis</label>
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
          <button onClick={() => savePrizeDraw()}>Criar</button>
        </BtnConfirm>
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default RegisterSweepstake;
