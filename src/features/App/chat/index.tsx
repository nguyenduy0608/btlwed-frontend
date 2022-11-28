import { Avatar, Divider, Row } from 'antd';
import styled from 'styled-components';
import ChatLeft from './components/Chat.Left';
import ChatRight from './components/Chat.Right';
import { TextAvatar } from './styles';
import {
    ButtonSend,
    ChatBox,
    ChatContent,
    HeaderContentChatStyled,
    InputSendChatStyled,
    SendChatStyled,
} from './styles/Chat.Content.style';
import { SendOutlined } from '@ant-design/icons';

const ChatPage = () => {
    return (
        <MainStyled>
            <LayoutContainer>
                <ChatLeft />
                <>
                    <ChatContent>
                        <div>
                            <HeaderContentChatStyled>
                                <Avatar style={{ backgroundColor: 'red' }} size={35}>
                                    <TextAvatar>999999</TextAvatar>
                                </Avatar>
                                <div className="name_user_chat">
                                    <span>Nguyễn Như Ý</span>
                                </div>
                            </HeaderContentChatStyled>
                            <Divider style={{ margin: 0 }} />
                        </div>
                        <ChatBox>
                            {/* <div ref={messagesTopRef} /> */}

                            <>kkkkk</>
                            {/* <div ref={messagesEndRef} /> */}
                        </ChatBox>

                        <div
                            style={{
                                boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 1px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`,
                            }}
                        >
                            <Divider style={{ margin: 0 }} />
                            <SendChatStyled>
                                <InputSendChatStyled
                                    // suffix={suffixInputSendChat}
                                    // onPressEnter={onPressEnterSendMessage}
                                    placeholder="Nhập tin nhắn ..."
                                />
                                <ButtonSend>
                                    <SendOutlined style={{ fontSize: '20px', color: 'white' }} />
                                </ButtonSend>
                            </SendChatStyled>
                        </div>
                    </ChatContent>
                    <ChatRight />
                </>
            </LayoutContainer>
        </MainStyled>
    );
};

const MainStyled = styled.div`
    padding: 14px;
    display: flex;
    justify-content: center;
    max-height: 100vh;
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

const LayoutContainer = styled(Row)`
    background-color: white;
    width: 100%;
    max-width: 2048px;
    height: calc(100vh - 28px);
    flex-wrap: nowrap;

    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

export default ChatPage;
