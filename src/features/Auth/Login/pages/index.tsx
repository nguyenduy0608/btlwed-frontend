import LocalStorage from '@/apis/LocalStorage';
import { routerPage } from '@/config/routes';
import { wait } from '@/utils';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import Wrapper from '../../Wrapper';
import InfoLogin from '../components/InfoLogin';

const LoginPage = () => {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (value: { email: string; password: string }) => {
        setLoading(true);
        LocalStorage.setToken('kkkkkk');
        wait(1500).then(() => {
            setLoading(false);
            window.location.reload();
        });
    };

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div className="gx-app-login-wrap">
                <div className="gx-app-login-container">
                    <Wrapper loading={loading}>
                        <div className="gx-app-login-main-content">
                            <InfoLogin />
                            <div className="gx-app-login-content">
                                <Form
                                    initialValues={{ email: 'admin@gmail.com', password: 'admin' }}
                                    onFinish={handleSubmit}
                                    className="gx-signin-form gx-form-row"
                                >
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                type: 'email',
                                                message: 'Vui lòng nhập đúng địa chỉ E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập địa chỉ email" />
                                    </Form.Item>
                                    <Form.Item
                                        className="gx-mb-1"
                                        name="password"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                    >
                                        <Input.Password type="password" placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Row justify="end">
                                        <Form.Item className="gx-m-0" initialValue={true}>
                                            <Checkbox checked>Nhớ mật khẩu</Checkbox>
                                        </Form.Item>
                                    </Row>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="gx-mb-0">
                                            Đăng nhập
                                        </Button>
                                        <span>hoặc </span>
                                        <Link to={routerPage.register}>Đăng ký</Link>
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
