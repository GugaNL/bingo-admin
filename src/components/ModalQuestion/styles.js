import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;

export const Content = styled.div`
  width: 400px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 5px;
  margin-top: 40px;
`;

export const Header = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > svg {
    cursor: pointer;
  }
`;

export const Title = styled.h3`
  margin: 0;
  text-align: center;
`;

export const Body = styled.div`
  padding: 10px;
  border-top: 1px solid ${(props) => props.theme.color.lightGray};
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
`;

export const Footer = styled.div`
  padding: 10px;
  margin-top: 12px;
`;

export const ContentButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;

  > button {
    margin: 16px;
    border: none;
    border-radius: 5px;
    padding: 12px 24px;
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.color.silver};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .button-confirm {
    background-color: ${(props) => props.theme.color.success};
  }

  .button-cancel {
    background-color: ${(props) => props.theme.color.orange};
  }
`;
