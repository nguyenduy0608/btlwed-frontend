import LocalStorage from '@/apis/LocalStorage';
import useCallContext from '@/hooks/useCallContext';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Badge, Popover, Row } from 'antd';
import IconAntd from '../IconAntd';

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
        <>
            <Row wrap={false} justify="start" className="gx-avatar-row gx-m-0">
                <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                    <Avatar src={state?.info?.avatar} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
                    <span className="gx-avatar-name gx-font-weight-bold" style={{ color: 'white' }}>
                        {state?.info?.fullName}
                        <DownOutlined className="gx-fs-sm gx-ml-4" />
                    </span>
                </Popover>
            </Row>
            <Row justify="center" className="gx-app-nav" style={{ marginTop: '26px' }}>
                <li>
                    <Badge showZero count={2}>
                        <IconAntd style={{ color: 'white' }} icon="MessageOutlined" />
                    </Badge>
                </li>
                <li>
                    <Badge showZero count={9}>
                        <IconAntd style={{ color: 'white' }} icon="BellOutlined" />
                    </Badge>
                </li>
            </Row>
        </>
    );
};

export default UserInfo;
