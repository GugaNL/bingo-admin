import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div``;

export const FieldContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  color: ${(props) => props.theme.color.white};

  > input {
    padding: 8px;
    border-radius: 5px;
    margin-top: 3px;
  }

  .btn-add {
    width: fit-content;
    margin-top: 10px;
    align-self: center;
    background: none;
  }

  .btn-minus {
    width: fit-content;
    background: none;
  }

  .btn-upload {
    background: none;
    border: 1.5px dashed ${(props) => props.theme.color.gray};
    border-radius: 3px;
    margin-top: 8px;
  }

  .btn-upload > svg {
    font-size: 42px;
  }

  > button > svg {
    font-size: 26px;
    color: ${(props) => props.theme.color.info};
  }

  > img {
    max-width: 250px;
    //width: 100%;
  }

  .input-title {
    //width: 400px;
  }

  .input-prize {
    //width: 500px;
  }

  .input-prize-desc {
    //width: 500px;
  }

  .input-date-prize-draw {
    width: 130px;
  }
`;

export const ContentInputDesc = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  > input {
    padding: 8px;
    border-radius: 5px;
    margin-top: 3px;
    width: 100%;
  }

  > button > svg {
    font-size: 28px;
    color: ${(props) => props.theme.color.orange};
    margin-right: 10px;
  }
`;

export const ContentUploadImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 300px;
  height: 300px;
  border: 1px solid ${(props) => props.theme.color.gray};
  margin-top: 40px;
  z-index: 0;
  //overflow: hidden;

  > img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const BtnDeleteImg = styled.button`
  position: absolute;
  right: -20px;
  top: -20px;
  background: ${(props) => props.theme.color.white};
  border-radius: 20px;
  padding: 6px 8px;
  transition: opacity 0.3;

  &:hover {
    opacity: 0.9;
  }

  > svg {
    color: ${(props) => props.theme.color.black};
    font-size: 24px;
  }
`;

export const ContainerImagesUpload = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
  }
`;

export const BtnConfirm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  > button {
    width: 300px;
    padding: 15px 10px;
    border-radius: 5px;
    background: ${(props) => props.theme.color.success};
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: opacity 0.3;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ContentPrizeDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: center;
`;

export const ContainerTicket = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 400px;

  @media (max-width: 435px) {
    flex-direction: column;
  }
`;

export const ContentLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const BtnNumbers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  > button {
    width: 200px;
    padding: 13px 8px;
    border-radius: 5px;
    background: ${(props) => props.theme.color.orange};
    color: ${(props) => props.theme.color.white};
    font-size: 15px;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: opacity 0.3;

    &:hover {
      opacity: 0.8;
    }
  }
`;