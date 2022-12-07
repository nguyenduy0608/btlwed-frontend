import LocalStorage from '@/apis/LocalStorage';
import PushNoti from '@/features/App/pushNoti';
import { rules } from '@/features/App/voucher/rules';
import useCallContext from '@/hooks/useCallContext';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Form, Input, Popover, Row, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SaveButton from '../Button/Save.Button';
import FormComponent from '../FormComponent';
import IconAntd from '../IconAntd';
import ModalComponent from '../ModalComponent';

import Clock from 'react-live-clock';
import styled from 'styled-components';
import { appService } from '@/service';

const UserInfo = () => {
    const { state, dispatch } = useCallContext();
    const navigate = useNavigate();
    const [countNoti, setCountNoti] = React.useState(0);

    const [open, setOpen] = React.useState(false);

    const [openNoti, setOpenNoti] = React.useState(false);

    const showDrawer = () => {
        setOpenNoti(true);
    };

    const [form] = Form.useForm();

    const handleSubmit = () => {};

    React.useEffect(() => {
        appService.getCountNoti().then((res) => {
            setCountNoti(res?.data?.count || 0);
        });
    }, [state.callbackNoti]);

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li className="gx-font-weight-medium" onClick={() => setOpen(true)}>
                Đổi mật khẩu
            </li>
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
                <Popover placement="bottomRight" content={userMenuOptions}>
                    <Avatar src={state?.info?.avatar} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
                    <span className="gx-avatar-name gx-font-weight-bold" style={{ color: 'white' }}>
                        {state?.info?.fullName}
                        <DownOutlined className="gx-fs-sm gx-ml-4" />
                    </span>
                </Popover>
            </Row>
            <Row justify="start" align="middle" className="gx-app-nav" style={{ marginTop: '15px' }}>
                <ClockStyled>
                    <Clock format="hh:mm:ss a" ticking />
                </ClockStyled>
                <li onClick={showDrawer}>
                    <Badge showZero count={countNoti || 0}>
                        <IconAntd style={{ color: 'white' }} icon="BellOutlined" />
                    </Badge>
                </li>
            </Row>
            <ModalComponent modalVisible={open} title="Đổi mật khẩu">
                <FormComponent form={form} onSubmit={handleSubmit}>
                    <Row gutter={[20, 0]}>
                        <Col span={24}>
                            <Form.Item
                                rules={[rules.required('Vui lòng nhập mật khẩu cũ!')]}
                                name="oldPassword"
                                label="Mật khẩu cũ"
                                hasFeedback
                            >
                                <Input.Password placeholder="Nhập mật khẩu cũ" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                rules={[rules.required('Vui lòng nhập mật khẩu mới!')]}
                                name="newPassword"
                                label="Mật khẩu mới"
                                hasFeedback
                            >
                                <Input.Password placeholder="Nhập mật khẩu mới" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                rules={[
                                    rules.required('Vui lòng xác nhận mật khẩu!'),
                                    ({ getFieldValue }: any) => ({
                                        validator(_: any, value: any) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập lại không trùng khớp!'));
                                        },
                                    }),
                                ]}
                                dependencies={['password']}
                                hasFeedback
                                name="reNewPassword"
                                label="Xác nhận mật khẩu"
                            >
                                <Input.Password placeholder="Nhập mật khẩu xác nhận" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} justify="end">
                        <Space>
                            <Button type="default" onClick={() => setOpen(false)}>
                                Đóng
                            </Button>
                            <SaveButton htmlType="submit" />
                        </Space>
                    </Row>
                </FormComponent>
            </ModalComponent>
            <PushNoti open={openNoti} setOpen={setOpenNoti} />
        </>
    );
};

const ClockStyled = styled.li`
    border-radius: 10px;
    margin-left: 20px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background: linear-gradient(to right, #2b5876, #4e4376);
    border: 1px dashed #ccc;
    & * {
        font-size: 1.6rem;
        font-weight: 700;
        color: white;
    }
`;

export default React.memo(UserInfo);
