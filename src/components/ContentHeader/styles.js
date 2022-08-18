import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const SubTitle = styled.h2`
  color: ${(props) => props.theme.color.white};

  &::after {
    content: "";
    display: block;
    width: 55px;
    border-bottom: 8px solid ${(props) => props.theme.color.warning};
  }
`;

export const Controllers = styled.div`
  display: flex;
`;
