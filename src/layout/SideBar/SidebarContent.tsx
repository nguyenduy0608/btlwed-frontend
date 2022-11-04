import logo_sidebar from '@/assets/images/logo_sidebar.png';
import CustomScrollbars from '@/components/CustomScrollbars';
import UserInfo from '@/components/UserInfo';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Menu, Row } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { items } from './Sidebar.Menu';

const SidebarContent = ({
    collapsed,
    handleCallbackCollapsed,
}: {
    collapsed?: boolean;
    handleCallbackCollapsed?: () => void;
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedKeys = location.pathname.substr(1) || '/';

    return (
        <>
            <Row align="middle" className="gx-m-0 gx-layout-sider-header">
                {!collapsed && (
                    <Link className="gx-d-block gx-pointer" to="/">
                        <div
                            style={{
                                border: '2px solid rgba(255,255,255,0.7)',
                                backgroundColor: '#F5F5F5',
                                padding: '6px 10px',
                                borderRadius: '10px',
                            }}
                        >
                            <img height="25px" alt="logo_sidebar" src={logo_sidebar} />
                        </div>
                        {/* <div style={{ color: 'white', fontSize: '24px' }}>STAKA</div> */}
                    </Link>
                )}
                <div className="gx-linebar" onClick={handleCallbackCollapsed}>
                    {collapsed ? (
                        <MenuUnfoldOutlined className="gx-icon-btn" />
                    ) : (
                        <MenuFoldOutlined className="gx-icon-btn" />
                    )}
                </div>
            </Row>
            <div className="gx-sidebar-content">
                {/* top sidebar */}
                <div className="gx-sidebar-notifications gx-pb-3 gx-pt-5">
                    {/* user info */}
                    <UserInfo />
                </div>
                {/* sidebar menu */}
                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <div className="gx-menu-group">
                        <MenuStyled
                            defaultOpenKeys={items.map((item: { key: string }) => item.key)}
                            selectedKeys={[selectedKeys]}
                            theme="dark"
                            mode="inline"
                            items={items}
                            onClick={(e) => navigate(e.key === '/' ? e.key : '/' + e.key)}
                        />
                    </div>
                </CustomScrollbars>
            </div>
        </>
    );
};

const MenuStyled = styled(Menu)`
    * {
        font-weight: 600;
    }
`;

export default React.memo(SidebarContent);
