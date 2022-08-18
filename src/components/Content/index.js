import React from "react";
import {Container} from './styles';

const Content = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Content;