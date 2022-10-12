import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import TopBar from '@/components/TopBar';
import { PADDING } from '@/config/theme';
import { Button, Col, Input, Row } from 'antd';
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
                    extra={
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    }
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
                                inputField={<Input />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập tên voucher!')]}
                                name="name"
                                label="Tên voucher"
                                inputField={<Input />}
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
