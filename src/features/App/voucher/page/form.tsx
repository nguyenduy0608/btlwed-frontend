import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import TopBar from '@/components/TopBar';
import { PADDING } from '@/config/theme';
import { Button, Checkbox, Col, DatePicker, Input, Row, Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { rules } from '../rules';

const VoucherFormPage = () => {
    
    return (
        <Container>
            <FormComponent layoutType="vertical" onSubmit={(values) => console.log(values)}>
                <TopBar
                    back
                    title="Thêm voucher khách hàng"
                    extra={[
                        <Button> Thoát</Button>,
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>,
                    ]}
                />
                <CardComponent>
                    <Row style={{ flexDirection: 'row' }}>
                        <Col span={6}>
                            <h2 className="gx-font-weight-medium">Thông tin chung</h2>
                        </Col>
                        <Col span={18}>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập mã voucher!')]}
                                name="code"
                                label="Mã voucher"
                                inputField={<Input placeholder="Nhập mã voucher" />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập tên voucher!')]}
                                name="name"
                                label="Tên voucher"
                                inputField={<Input placeholder="Nhập tên voucher" />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập số lượng voucher!')]}
                                name="amount"
                                label="Số lượng voucher"
                                inputField={<Input placeholder="Nhập số lượng voucher" />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập trạng thái voucher!')]}
                                name="status"
                                label="Trạng thái"
                                inputField={<Input placeholder="Nhập trạng thái voucher" />}
                            />
                            <FormItemComponent
                                name="reduce"
                                label="Mức giảm"
                                inputField={<Input placeholder="Nhập mức giảm" />}
                            />
                            <FormItemComponent
                                name="reduceMax"
                                label="Giá trị giảm tối đa"
                                inputField={<Input placeholder="Nhập giá trị giảm tối đa" />}
                            />
                            <FormItemComponent
                                name="minimumValue"
                                label="Giá trị đơn hàng tối thiểu"
                                inputField={<Input placeholder="Nhập giá trị đơn hàng tối thiểu" />}
                            />
                            <FormItemComponent
                                name="provided"
                                label=""
                                inputField={
                                    <Checkbox>
                                        <strong>Gửi thông báo cho khách hàng </strong>
                                    </Checkbox>
                                }
                            />
                        </Col>
                    </Row>
                    <Row style={{ flexDirection: 'row' }}>
                        <Col span={6}>
                            <h2 className="gx-font-weight-medium">Thời gian áp dụng</h2>
                        </Col>
                        <Col span={18}>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập ngày bắt đầu!')]}
                                name="createAt"
                                label="Ngày bắt đầu"
                                inputField={<DatePicker placeholder="Ngày" style={{ width: '100%' }} />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập ngày kết thúc!')]}
                                name="endAt"
                                label="Ngày kết thúc"
                                inputField={<DatePicker placeholder="Ngày" style={{ width: '100%' }} />}
                            />
                            <FormItemComponent
                                name="apply"
                                label=""
                                inputField={
                                    <Checkbox>
                                        <strong>Áp dụng cho toàn bộ sản phẩm</strong>
                                    </Checkbox>
                                }
                            />
                        </Col>
                    </Row>
                </CardComponent>
            </FormComponent>
        </Container>
    );
};

const Container = styled.div`
    padding: ${PADDING};
`;

export default VoucherFormPage;
