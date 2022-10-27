import React from 'react';
import { Container }  from './styles'


const Button = ({children, ...rest }) => ( //O rest serve para funcionar o onClick
    <Container {...rest}>
        {children}
    </Container>
);

export default Button;