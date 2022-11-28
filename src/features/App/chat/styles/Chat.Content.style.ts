import { FileImageOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styled from 'styled-components';

export const ChatContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const HeaderContentChatStyled = styled.div`
    padding: 15px 20px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-right: 1px solid #f3f3f3;
    border-left: 1px solid #f3f3f3;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;

    & .name_user_chat {
        margin-left: 10px;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const SendChatStyled = styled.div`
    padding: 16px 20px;
    position: relative;
    border-right: 1px solid #f1f1f1;
    border-left: 1px solid #f1f1f1;
`;

export const InputSendChatStyled = styled(Input)`
    height: 44px;
    border-radius: 999px;
    padding: 0 76px 0 20px;
    border-color: #e3e3e3;

    & input {
        font-size: 15px;
        font-weight: 500;
    }
`;

export const ButtonSend = styled.div`
    position: absolute;
    cursor: pointer;

    right: 12px;
    top: 50%;

    transform: translateY(-50%);

    background-color: #038fdd;

    &:hover {
        background-color: #1890ff;
    }

    height: 50px;
    width: 50px;

    border-radius: 50%;

    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const styleIcon = ` 
    font-size: 22px;
    color: #666;
    cursor: pointer;
    &:hover {
        color: black !important;
    }
`;
export const PaperClipOutlinedStyled = styled(PaperClipOutlined)`
    ${styleIcon}
`;

export const FileImageOutlinedStyled = styled(FileImageOutlined)`
    ${styleIcon}
`;

export const ChatBox = styled.div`
    flex: 1;
    padding: 14px;
    overflow-y: overlay;

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

    background: #c9d6ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #e2e2e2, #c9d6ff); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to top,
        #e2e2e2,
        #c9d6ff
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    width: 100%;
`;

export const ChatText = styled.div<{ user?: boolean }>`
    background-color: ${(props) => (props.user ? '#f5f5f5' : '#096dd9')};
    color: ${(props) => (props.user ? 'black' : 'white')};
    ${(props) =>
        props?.user
            ? 'border-top-left-radius: 16px;border-top-right-radius: 16px; border-bottom-right-radius: 16px;'
            : 'border-top-right-radius: 16px;border-top-left-radius: 16px; border-bottom-left-radius: 16px;'}
    padding: 10px 14px;

    font-size: 15px;
    font-weight: 500;
`;

export const EmptyChatContentStyled = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & h2 {
        font-size: 22px;
        font-weight: 500;
    }
    & p {
        margin-top: 20px;
        width: 600px;
        text-align: center;
        font-size: 15px;
    }
`;

export const ImgEmptyStyled = styled.img`
    height: 400px;
    width: 680px;
`;
