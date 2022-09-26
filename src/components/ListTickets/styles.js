import styled from "styled-components";

export const ContentLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(60, 60, 60, 0.7);
`;

export const ContentLegends = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5%;
  margin-top: 40px;
  padding: 0 8px;

  @media (max-width: 430px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SquareLegend = styled.div`
  display: flex;
  align-items: center;
  padding: 5%;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.colorStatus};
  justify-content: center;
  text-align: center;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export const ContentNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 40px;
  padding: 0 8px;
`;

export const SquareNumber = styled.div`
  display: flex;
  align-items: center;
  padding: 5%;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.colorStatus || props.theme.color.blue};
  justify-content: center;
  text-align: center;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;