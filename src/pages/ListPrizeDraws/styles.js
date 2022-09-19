import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div``;

export const FiltersLegends = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  .filter-legend {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.color.white};
    margin: 0 15px;
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }
  }

  .progress::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border: 6px solid ${props => props.theme.color.green};
    }

    .finished::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border: 6px solid ${props => props.theme.color.blue};
    }

    .canceled::after {
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border: 6px solid ${props => props.theme.color.danger};
    }
`;

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
  z-index: 1;
`;