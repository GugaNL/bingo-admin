import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  margin-top: 30px;
`;

export const FieldContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  color: ${(props) => props.theme.color.white};

  > input,
  select {
    padding: 8px;
    border-radius: 5px;
    margin-top: 3px;
  }

  .input-name {
    max-width: 200px;
  }

  .input-cpf {
    width: 120px;
  }

  .input-email {
    max-width: 250px;
  }

  .input-address {
    max-width: 300px;
  }

  .input-address-number {
    width: 60px;
  }

  .input-neighborhood {
    width: 200px;
  }

  .input-complement {
    max-width: 300px;
  }

  .input-city {
    max-width: 150px;
  }

  .input-zipcode {
    max-width: 100px;
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

  .select-state {
    width: 100px;
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
`;

export const BtnConfirm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  > button {
    width: 300px;
    padding: 15px 10px;
    border-radius: 5px;
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transition: opacity 0.3;

    &:hover {
      opacity: 0.8;
    }
  }

  .button-edit {
    background: ${(props) => props.theme.color.orange};
  }

  .button-save {
    background: ${(props) => props.theme.color.success};
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
  width: 300px;

  @media (max-width: 340px) {
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

export const ContainerName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 450px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const BtnNumbers = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
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

    > svg {
      margin-right: 8px;
    }
  }
`;
