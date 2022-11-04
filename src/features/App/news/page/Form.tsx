import CardComponent from '@/components/CardComponent';
import CustomScrollbars from '@/components/CustomScrollbars';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { rules } from '../../voucher/rules';
import Content from '../components/Content';

const NewsFormPage = () => {
    const [form] = Form.useForm();

    const handleSubmit = () => {};

    return (
        <FormComponent form={form} onSubmit={handleSubmit}>
            <TopBar
                back
                title="Thêm tin tức"
                extra={[
                    <Button key="saveVoucher" type="primary" htmlType="submit">
                        Lưu
                    </Button>,
                ]}
            />
            <Container>
                <CardComponent>
                    <Row>
                        {/* col bên trái */}
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập mã voucher!')]}
                                    name="code"
                                    label="Tiêu đề tin tức"
                                    inputField={<Input placeholder="Nhập tiêu đề tin tức" />}
                                />
                            </Row>
                        </Col>
                        {/* <Col xs={24} sm={24} lg={12}>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng chọn loại khách hàng!')]}
                                name="customerType"
                                label="Loại khách hàng"
                                inputField={
                                    <Select placeholder="Chọn loại khách hàng">
                                        <Select.Option value={1}>Đại lý</Select.Option>
                                    </Select>
                                }
                            />
                        </Col> */}
                    </Row>
                    <div>
                        <p>Nội dung tin tức</p>
                        <Content />
                    </div>
                </CardComponent>
            </Container>
        </FormComponent>
    );
};

export default NewsFormPage;
