import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .gx-app-sidebar * {
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;
  }

  html {
    font-size: 62.5%;
    height: 100%;
    max-width: 100vw;

    overflow: hidden;
    line-height: 1.6rem;
    font-weight: 500;

    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
    font-family: 'Quicksand', sans-serif !important;
  }


  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    font-size: 1.5rem;
  }


  #app-site {
    display: flex;
    width: 100%;
    height: 100vh;
  }

  #__next {
   height: 100%;
  }

  .ant-descriptions-item-content {
    font-weight: bold;
  }

  span.ant-descriptions-item-label {
    min-width: 100px;
  }


  .ant-descriptions-bordered .ant-descriptions-view {
    border: none;
  }


`;

export default GlobalStyle;
