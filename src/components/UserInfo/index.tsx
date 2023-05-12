import LocalStorage from '@/apis/LocalStorage';
import PushNoti from '@/features/App/pushNoti';
import { rules } from '@/features/App/voucher/rules';
import useCallContext from '@/hooks/useCallContext';
import { DownOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Form, Input, Popconfirm, Popover, Row, Space } from 'antd';
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

    const [form] = Form.useForm();

    const handleSubmit = () => {};

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <Popconfirm
                title={<strong style={{ marginTop: '10px' }}>Bạn chắc chắn muốn đăng xuất tài khoản này?</strong>}
                onConfirm={() => {
                    LocalStorage.removeToken();
                    window.location.reload();
                }}
                okText="Ok"
                cancelText="Hủy"
                okButtonProps={{
                    type: 'primary',
                }}
            >
                <li className="gx-font-weight-medium">Đăng xuất</li>
            </Popconfirm>
        </ul>
    );

    return (
        <>
            <Row wrap={false} justify="center" className="gx-avatar-row gx-m-0">
                <Popover placement="bottomRight" content={userMenuOptions}>
                    <Avatar src={state?.info?.avatar} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
                    <span className="gx-avatar-name gx-font-weight-bold" style={{ color: 'white' }}>
                        {state?.info?.fullName}
                        <DownOutlined className="gx-fs-sm gx-ml-4" />
                    </span>
                </Popover>
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
        </>
    );
};

const ClockStyled = styled.li`
    border-radius: 10px;
    margin-left: 20px;
    width: 140px;
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
