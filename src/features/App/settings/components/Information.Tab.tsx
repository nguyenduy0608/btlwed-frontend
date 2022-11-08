import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import UploadComponent from '@/components/Upload';
import useCallContext from '@/hooks/useCallContext';
import { Card, Col, Input, InputNumber, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

const InformationTab = () => {
    const { state } = useCallContext();
    console.log('🚀 ~ file: Information.Tab.tsx ~ line 12 ~ InformationTab ~ state', state);

    return (
        <FormComponent initialValues={{ point: 0 }} onSubmit={() => {}}>
            <Row gutter={[12, 0]}>
                <Col span={12}>
                    <Card className="gx-mb-4">
                        <TitleCardStyled>Tích điểm</TitleCardStyled>
                        <FormItemComponent
                            label="% tích điểm"
                            name="point"
                            inputField={
                                <InputNumber
                                    min={0}
                                    max={100}
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                    placeholder="Nhập tổng giá trị"
                                />
                            }
                        />
                    </Card>
                    <Card>
                        <TitleCardStyled>Thông tin liên hệ</TitleCardStyled>
                        <FormItemComponent label="Zalo" name="zalo" inputField={<Input />} />
                        <FormItemComponent label="Facebook" name="fb" inputField={<Input />} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <TitleCardStyled>Thông tin chuyển khoản</TitleCardStyled>
                        <FormItemComponent
                            label="Tên ngân hàng"
                            name="bankName"
                            inputField={<Input placeholder="Nhập tên ngân hàng" />}
                        />
                        <FormItemComponent
                            label="Số tài khoản"
                            name="paymentNumber"
                            inputField={
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                    placeholder="Nhập số tài khoản"
                                />
                            }
                        />
                        <FormItemComponent
                            label="Tên tài khoản"
                            name="bankName"
                            inputField={<Input placeholder="Nhập tên tài khoản" />}
                        />
                        <FormItemComponent
                            label="QR code"
                            inputField={
                                <UploadComponent
                                    // isUploadServerWhenUploading
                                    // initialFile={fileEdit.current}
                                    uploadType="list"
                                    listType="picture-card"
                                    maxLength={1}
                                    onSuccessUpload={(url: any) => {
                                        // setFile(url?.originFileObj);
                                    }}
                                />
                            }
                        />
                    </Card>
                </Col>
            </Row>
        </FormComponent>
    );
};

const TitleCardStyled = styled.div`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export default InformationTab;
