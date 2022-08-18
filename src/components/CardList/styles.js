import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.gray};
  list-style: none;
  border-radius: 5px;
  margin: 10px 0%;
  padding: 12px 10px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  color: ${props => props.theme.color.white};

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  }
`;

export const TagColor = styled.div`
  width: 10px;
  height: 60%;
  background-color: ${props => props.colorStatus};
  position: absolute;
  left: 0;
`;
