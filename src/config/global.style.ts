import { Select } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

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

  .rowTableSelect  {
    color: rgba(24,144,255) !important;
    transition: background .2s ease-in-out;
    background-color: white;
    /* & * {font-weight: 600 !important;} */
    & td:first-child  *{
      color: black;
    }

    &.ant-table-row-selected {
      color: black;
    }

    &:hover {
      color: black;

    }
  }

  .rowTableSelect td {
    border-top:  1px solid rgba(24,144,255,.5);
  }

  .rowTableSelect > td:last-child {
    border-right:  1px solid rgba(24,144,255,.5) !important;
  }

  .rowTableSelect > td:first-child {
    border-left:  1px solid rgba(24,144,255,.5);
  }

  .ant-table-expanded-row > td {
    border-right: 1px solid rgba(24,144,255,.5) !important;
    border-left: 1px solid rgba(24,144,255,.5) !important;
    border-bottom: 1px solid rgba(24,144,255,.5) !important;
  }
  td.ant-descriptions-item {
    padding: 0 16px 16px;
  }
`;

export const DefaultSelectStyled = styled(Select)`
    width: 200px;
`;

export default GlobalStyle;
