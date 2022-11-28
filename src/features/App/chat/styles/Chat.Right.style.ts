import { Button, Card, Collapse, Tabs } from 'antd';
import styled from 'styled-components';

export const HeaderStorage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    & span {
        font-size: 16px;
        font-weight: 700;
    }
`;

export const MainStorage = styled.div`
    overflow-y: hidden;
    flex: 1;
    &:hover {
        overflow-y: overlay;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.005);
    }

    &::-webkit-scrollbar {
        width: 4px;
        background-color: rgba(0, 0, 0, 0.005);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
    }

    & * {
        -webkit-user-select: none; /* Chrome all / Safari all */
        -moz-user-select: none; /* Firefox all */
        -ms-user-select: none; /* IE 10+ */
        user-select: none;
    }
`;

export const CollapseStyled = styled(Collapse)`
    height: 100%;
    overflow-y: hidden;
    & .ant-collapse-header {
        font-size: 16px;
        font-weight: 500;
    }
`;

export const CardImageStyled = styled(Card)`
    min-height: 60px;
    display: flex;
    justify-content: center;
    & .ant-card-body {
        padding: 4px;
    }
`;

export const ButtonViewAll = styled(Button)`
    margin-top: 10px;
    border-radius: 6px;
`;

export const ItemFile = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    cursor: pointer;
`;

export const TabsStyled = styled(Tabs)`
    height: calc(100% - 100px);
    overflow: hidden;
    & .ant-tabs-nav-list {
        width: 100% !important;
    }

    & .ant-tabs-tab {
        flex: 1;
        display: flex;
        justify-content: center;
    }
`;
