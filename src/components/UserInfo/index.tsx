import { Avatar, Popover, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import LocalStorage from '@/apis/LocalStorage';
import useCallContext from '@/hooks/useCallContext';
import { images } from '@/assets/imagesAssets';

const UserInfo = () => {
    const { state, dispatch } = useCallContext();

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li className="gx-font-weight-medium">Tài khoản</li>
            <li
                className="gx-font-weight-medium"
                onClick={() => {
                    LocalStorage.removeToken();
                    window.location.reload();
                }}
            >
                Đăng xuất
            </li>
        </ul>
    );
    return (
        <Row wrap={false} justify="start" className="gx-avatar-row gx-m-0">
            <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                <Avatar src={images.logo} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
                <span className="gx-avatar-name gx-font-weight-bold" style={{ color: 'white' }}>
                    {state?.info?.fullName}
                    <DownOutlined className="gx-fs-sm gx-ml-4" />
                </span>
            </Popover>
        </Row>
    );
};

export default UserInfo;
