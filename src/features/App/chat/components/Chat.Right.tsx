import { DoubleLeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Collapse, Divider, Tabs } from 'antd';
import React from 'react';
import { SidebarStyled } from '../styles';

import { CollapseStyled, HeaderStorage, MainStorage, TabsStyled } from '../styles/Chat.Right.style';

const styleIcon = { fontSize: '18px', cursor: 'pointer' };

const ChatRight = () => {
    const [hiddenSidebar, setHiddenSidebar] = React.useState(false);

    const [viewAll, setViewAll] = React.useState(false);

    return (
        <SidebarStyled width={hiddenSidebar ? '40px' : ''} position="right">
            {hiddenSidebar ? (
                <MenuFoldOutlined onClick={() => setHiddenSidebar(!hiddenSidebar)} style={styleIcon} />
            ) : (
                <HeaderStorage>
                    {viewAll && (
                        <DoubleLeftOutlined
                            style={{ fontSize: '22px', fontWeight: 'bold' }}
                            onClick={() => setViewAll(false)}
                        />
                    )}
                    <span>Lưu Trữ</span>
                    <MenuUnfoldOutlined onClick={() => setHiddenSidebar(!hiddenSidebar)} style={styleIcon} />
                </HeaderStorage>
            )}
            {!hiddenSidebar && (
                <>
                    <Divider />
                    {viewAll ? (
                        <TabsStyled
                            style={{
                                height: 'calc(100% - 100px)',
                                overflow: 'overlay',
                            }}
                            centered
                            tabBarGutter={0}
                        >
                            <Tabs.TabPane tab="Ảnh/Video" key="item-1">
                                456
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Files" key="item-2">
                                123
                            </Tabs.TabPane>
                        </TabsStyled>
                    ) : (
                        <MainStorage>
                            <CollapseStyled expandIconPosition="end" defaultActiveKey={['1', '2']} ghost>
                                <Collapse.Panel header="Ảnh/Video" key="1">
                                    <span style={{ textAlign: 'center', padding: '0 10px', display: 'inline-block' }}>
                                        Chưa có ảnh/video được chia sẻ trong hội thoại này
                                    </span>
                                </Collapse.Panel>
                                <Collapse.Panel header="File" key="2">
                                    <span style={{ textAlign: 'center', padding: '0 10px', display: 'inline-block' }}>
                                        Chưa có tài liệu được chia sẻ trong hội thoại này
                                    </span>
                                </Collapse.Panel>
                            </CollapseStyled>
                        </MainStorage>
                    )}
                </>
            )}
        </SidebarStyled>
    );
};

export default ChatRight;
