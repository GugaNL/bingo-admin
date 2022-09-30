import React from 'react';
import { Container }  from './styles'


const Button = ({children, ...rest }) => (
    <Container {...rest}>
        {children}
    </Container>
);

export default Button;