import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background-color: #0d1117;
    color: #f1f7fd;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font: 1rem 'Hind Siliguri', sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;
