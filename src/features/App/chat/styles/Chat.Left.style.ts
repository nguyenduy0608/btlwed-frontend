import { BOX_SHADOW } from '@/config/theme';
import { Avatar, Input, Row } from 'antd';
import styled from 'styled-components';

export const AvatarStyled = styled(Avatar)`
    box-shadow: ${BOX_SHADOW};
    margin-right: 16px;
`;

export const WrapperInfo = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 500;

    & .user_name {
        display: flex;
        justify-content: space-between;

        font-size: 16px !important;
        font-weight: bold;
        color: #1890ff;
    }

    & .user_role {
        font-size: 12px !important;
        color: #999;
        margin-top: 4px;
    }
`;

export const WrapperSearch = styled.div`
    margin: 30px 0;
`;

export const SearchInputStyled = styled(Input)`
    border-radius: 999px;
    height: 38px;

    border-color: #eeeded;
`;

export const AvatarUserItem = styled(Avatar)`
    box-shadow: ${BOX_SHADOW};
    margin-right: 10px;
    & img {
        object-fit: cover;
    }
`;

export const WrapperInfoUserItem = styled.div`
    width: 100%;
    position: relative;

    & .user_name {
        display: flex;
        justify-content: space-between;

        font-size: 15px !important;
        color: black;
    }

    & .user_name span:first-child {
        font-weight: 400;
    }

    & .user_name span:last-child {
        font-size: 12px;
        color: #ccc;
        width: 60px;
        text-align: right;
    }

    & .user_role {
        margin-top: 4px;
        font-size: 13px;
        color: #888;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 140px;
        overflow: hidden;
    }
`;

export const WrapperUserItem = styled(Row)<{ user_active?: string }>`
    cursor: pointer;
    padding: 10px 25px;
    ${(props) => props.user_active && props.user_active}
    &:hover {
        opacity: 0.8;
    }
    margin-bottom: 4px;
`;

export const ListUserStyled = styled.div`
    width: 100%;
    border-top: 1px solid #f2f2f2;
    // padding: 20px 25px;
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
`;

export const EmptyHistoryChatStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    font-size: 16px;
    padding: 0 60px;
    text-align: center;
`;

export const WatchedStyled = styled.span`
    position: absolute;
    right: 0;
    background: red;
    padding: 1px 4px;
    border-radius: 9999px;
    font-size: 10px;
    color: white;
`;
