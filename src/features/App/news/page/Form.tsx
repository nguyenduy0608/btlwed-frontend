import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { rules } from '../../voucher/rules';
import NewsEditor from '../components/Editor';
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
                                    label="Mã voucher"
                                    inputField={<Input placeholder="Nhập mã voucher" />}
                                />
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} lg={12}>
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
                        </Col>
                    </Row>
                    <div>
                        <p>Nội dung tin tức</p>
                        <div>
                            <NewsEditor />
                        </div>
                    </div>
                </CardComponent>
            </Container>
        </FormComponent>
    );
};

export default NewsFormPage;
