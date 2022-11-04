import CardComponent from '@/components/CardComponent';
import CustomScrollbars from '@/components/CustomScrollbars';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { rules } from '../../voucher/rules';
import NewsEditor from '../components/Editor';
import './iphone.css';

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
                        <Row>
                            <Col span={17}>
                                <NewsEditor />
                            </Col>
                            <Col span={7}>
                                <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Preview</h2>
                                <section className="iphoneMock">
                                    <div className="container">
                                        <div className="iphone">
                                            <div className="bordeColor">
                                                <div className="backSide"></div>
                                                <div className="bordeNegro">
                                                    <div className="notch">
                                                        <div className="bocina"></div>
                                                        <div className="camara"></div>
                                                    </div>
                                                    <div className="mainScreen">
                                                        <div className="statusBar">
                                                            <div className="leftSide">
                                                                <div className="operador">Staka</div>
                                                                <div className="widgetPlus"></div>
                                                            </div>
                                                            <div className="rightSide">
                                                                <div className="signal mid">
                                                                    <i className="bar"></i>
                                                                </div>
                                                                <div className="datos">5G</div>
                                                                <div className="bateria mid"></div>
                                                                <div className="exitShake">Listo</div>
                                                            </div>
                                                        </div>
                                                        <CustomScrollbars>
                                                            <div style={{ padding: '10px 10px 50px 10px' }}>
                                                                <div style={{ color: '#fff' }}>
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                                    elit. Unde similique esse, ex a rem perspiciatis.
                                                                    Repudiandae nam aliquid delectus officiis,
                                                                    consectetur veritatis similique dignissimos quam, et
                                                                    dolorum doloremque voluptatem earum!
                                                                </div>
                                                                <div style={{ color: '#fff' }}>
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                                    elit. Unde similique esse, ex a rem perspiciatis.
                                                                    Repudiandae nam aliquid delectus officiis,
                                                                    consectetur veritatis similique dignissimos quam, et
                                                                    dolorum doloremque voluptatem earum!
                                                                </div>
                                                                <div style={{ color: '#fff' }}>
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                                    elit. Unde similique esse, ex a rem perspiciatis.
                                                                    Repudiandae nam aliquid delectus officiis,
                                                                    consectetur veritatis similique dignissimos quam, et
                                                                    dolorum doloremque voluptatem earum!
                                                                </div>
                                                                <div style={{ color: '#fff' }}>
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                                    elit. Unde similique esse, ex a rem perspiciatis.
                                                                    Repudiandae nam aliquid delectus officiis,
                                                                    consectetur veritatis similique dignissimos quam, et
                                                                    dolorum doloremque voluptatem earum!
                                                                </div>
                                                                <div style={{ color: '#fff' }}>
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                                    elit. Unde similique esse, ex a rem perspiciatis.
                                                                    Repudiandae nam aliquid delectus officiis,
                                                                    consectetur veritatis similique dignissimos quam, et
                                                                    dolorum doloremque voluptatem earum!
                                                                </div>
                                                                <div style={{ color: '#fff' }}>
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                                    elit. Unde similique esse, ex a rem perspiciatis.
                                                                    Repudiandae nam aliquid delectus officiis,
                                                                    consectetur veritatis similique dignissimos quam, et
                                                                    dolorum doloremque voluptatem earum!
                                                                </div>
                                                                <div style={{ color: '#fff' }}>
                                                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                                                    elit. Unde similique esse, ex a rem perspiciatis.
                                                                    Repudiandae nam aliquid delectus officiis,
                                                                    consectetur veritatis similique dignissimos quam, et
                                                                    dolorum doloremque voluptatem earum!
                                                                </div>
                                                            </div>
                                                        </CustomScrollbars>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </Col>
                        </Row>
                    </div>
                </CardComponent>
            </Container>
        </FormComponent>
    );
};

export default NewsFormPage;
