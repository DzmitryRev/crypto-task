import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        cursor: default;
    }
    body{
        font-family: 'Montserrat', sans-serif;
    }
    a{
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
    button{
        font: inherit;
        border: none;
        cursor: pointer;
    }
    svg{
        cursor: pointer;
        *{
            cursor: pointer;
        }
    }
    :root {
        --blue-color: #4d94ff;
        --green-color: #00b33c;
        --red-color: #ff4d4d;
    }
    ::-webkit-scrollbar {
    width: 5px;
    }
    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
    background: #888;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`;
