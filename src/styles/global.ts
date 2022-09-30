import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    button{
        font: inherit;
    }
`;
