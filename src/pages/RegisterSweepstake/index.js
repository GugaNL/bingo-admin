import React, { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  BtnConfirm
} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import { ImageTypeRegex } from "../../constants";

const RegisterSweepstake = (props) => {
  const [values, setValues] = useState({
    title: "",
    prize: "",
    prizeImages: [],
    prizeDescription: [{ id: 1, desc: "" }],
    tickedValue: 0,
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
            ...prev.prizeDescription.map((feat) => {
              if (feat.id === descId) {
              }
            }),
          ],
        };
      });
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

  const savePrizeDraw = () => {
    console.log(values);
    toast.success('Sorteio criado com sucesso', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      });
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
            //autoComplete="given-name"
            //maxLength={INPUT_MAX_LENGTH}
            //className="input-field"
            //aria-label={labelFirstName}
            placeholder="Texto que será exibido"
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
            //autoComplete="given-name"
            //maxLength={INPUT_MAX_LENGTH}
            //className="input-field"
            //aria-label={labelFirstName}
            placeholder="Informe o prêmio"
            value={values.prize || ""}
            onChange={(event) => onChangeInput(event.target)}
          />
        </FieldContent>

        <FieldContent>
          <label>Data do sorteio</label>
          <InputMask
            //onBlur={event => onBlur(event)}
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

        <ContainerImagesUpload>
          {images.length > 0 &&
            images.map((imageSrc, index) => (
              <ContentUploadImage>
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
              <>
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
                    //autoComplete="given-name"
                    //maxLength={INPUT_MAX_LENGTH}
                    //className="input-field"
                    //aria-label={labelFirstName}
                    //placeholder="Informe o prêmio"
                    value={values.prizeDescription[index].desc || ""}
                    onChange={(event) => onChangeInput(event.target, item.id)}
                  />
                </ContentInputDesc>
              </>
            ))}
          <button className="btn-add" onClick={() => addFeature()}>
            <FaChevronCircleDown />
          </button>
        </FieldContent>
        <BtnConfirm>
          <button onClick={() => savePrizeDraw()}>Criar</button>
        </BtnConfirm>
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default RegisterSweepstake;
