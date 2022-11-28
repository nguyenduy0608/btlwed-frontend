import { Row, Space } from 'antd';
import styled from 'styled-components';

export const MainStyled = styled.div`
    padding: 14px;
    display: flex;
    justify-content: center;
    max-height: calc(100vh);
    overflow-y: overlay;
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.005);
    }

    &::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(0, 0, 0, 0.005);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const LayoutContainer = styled(Row)`
    background-color: white;
    width: 100%;
    max-width: 2048px;
    height: calc(100vh - 28px);
    flex-wrap: nowrap;

    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

export const SidebarStyled = styled.div<{ position: string; width?: string }>`
    display: flex;
    flex-direction: column;

    width: ${(props) => (props.width ? props.width : '280px')};
    padding: 17px 0 0;
    ${(props) =>
        props.position === 'left'
            ? 'border-top-left-radius: 10px;border-bottom-left-radius: 10px;'
            : 'border-top-right-radius: 10px;border-bottom-right-radius: 10px;'}

    background-color: #fff;
    height: 100%;

    transition: width 0.15s ease-in-out;
`;

export const TextAvatar = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
`;

export const LinkShareStyled = styled.a`
    word-break: break-all;
    text-decoration: underline;
    color: #fafafa;
`;

export const SpaceStyled = styled(Space)<{ full?: any }>`
    & .ant-space-item:first-child {
        ${(props) => (props.full ? 'width: 100%;' : '')}
    }
`;

export const SpaceStyled2 = styled(Space)<{ full?: any }>`
    & .ant-space-item:last-child {
        ${(props) => (props.full ? 'width: 100%;' : '')}
    }
`;

export const ViewBeforeStyled = styled.div`
    cursor: pointer;

    & > span:last-child {
        display: none;
    }

    &:hover > span:first-child {
        display: none;
    }
    &:hover > span:last-child {
        display: inline-block;
    }

    & span {
        font-weight: 600;
    }
`;
