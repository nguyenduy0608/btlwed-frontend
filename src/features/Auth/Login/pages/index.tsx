import LocalStorage from '@/apis/LocalStorage';
import { Notification, wait } from '@/utils';
import { errorValidPhone } from '@/utils/validation';
import { Button, Form, Input } from 'antd';
import React from 'react';
import Wrapper from '../../Wrapper';
import InfoLogin from '../components/InfoLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (data: any) => {
        setLoading(true);
        const res = await axios.post('http://26.75.181.165:8080/login', {
            username: data?.username,
            password: data?.password,
        });

        if (res.status) {
            const token = res.headers['authorization'];
            LocalStorage.setToken(token);
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${LocalStorage.getToken()}`,
            };
            Notification('success', 'Đăng nhập thành công');

            wait(1500).then(() => {
                window.location.reload();
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    };
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div className="gx-app-login-wrap">
                <div className="gx-app-login-container">
                    <Wrapper loading={loading}>
                        <div className="gx-app-login-main-content">
                            <InfoLogin />
                            <div className="gx-app-login-content">
                                <Form onFinish={handleSubmit} className="gx-signin-form gx-form-row">
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
                                    >
                                        <Input placeholder="Nhập tài khoản" />
                                    </Form.Item>
                                    <Form.Item
                                        className="gx-mb-1"
                                        name="password"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                    >
                                        <Input.Password type="password" placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Form.Item className="gx-mt-4 gx-d-flex gx-justify-content-end">
                                        <Button type="primary" htmlType="submit" className="gx-mb-0">
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Wrapper>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
