import { SearchOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import { SidebarStyled } from '../styles';

import {
    AvatarStyled,
    EmptyHistoryChatStyled,
    ListUserStyled,
    SearchInputStyled,
    WrapperInfo,
    WrapperSearch,
} from '../styles/Chat.Left.style';

const ChatLeft = () => {
    return (
        <SidebarStyled position="left">
            <div style={{ padding: '0 14px' }}>
                <Row className="gx-m-0" align="middle">
                    <AvatarStyled style={{ backgroundColor: '#832023' }} size={45}>
                        Nguyễn Như ý
                    </AvatarStyled>

                    <WrapperInfo>
                        <span className="user_name">Nguyễn Như ý</span>
                        <span className="user_role">Software engineer</span>
                    </WrapperInfo>
                </Row>
                <WrapperSearch>
                    <SearchInputStyled
                        allowClear
                        placeholder="Tìm kiếm ..."
                        prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                        className="search_user"
                    />
                </WrapperSearch>
            </div>

            <ListUserStyled>
                <EmptyHistoryChatStyled>Chưa có cuộc trò chuyện nào</EmptyHistoryChatStyled>
            </ListUserStyled>
        </SidebarStyled>
    );
};

export default ChatLeft;
