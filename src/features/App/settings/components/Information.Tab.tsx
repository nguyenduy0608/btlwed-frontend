import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import UploadComponent from '@/components/Upload';
import useCallContext from '@/hooks/useCallContext';
import { Button, Card, Col, Input, InputNumber, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

const InformationTab = () => {
    const { state } = useCallContext();
    const [isEditPoint, setIsEditPoint] = React.useState(false);
    const [isEditContact, setIsEditContact] = React.useState(false);
    const [isEditInfoPayment, setIsEditInfoPayment] = React.useState(false);

    return (
        <Row gutter={[12, 0]}>
            <Col span={12}>
                <Card className="gx-mb-4">
                    <FormComponent initialValues={{ point: 0 }} onSubmit={() => {}}>
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
                    </FormComponent>
                    {isEditPoint && (
                        <Row justify="end" className="gx-m-0">
                            <Button htmlType="submit" type="primary">
                                Cập nhật
                            </Button>
                        </Row>
                    )}
                </Card>

                <Card>
                    <FormComponent onSubmit={() => {}}>
                        <TitleCardStyled>Thông tin liên hệ</TitleCardStyled>

                        <FormItemComponent
                            label="Zalo"
                            name="zalo"
                            inputField={<Input placeholder="https://zalo.me" />}
                        />
                        <FormItemComponent
                            label="Facebook"
                            name="fb"
                            inputField={<Input placeholder="https://www.facebook.com" />}
                        />
                        {isEditContact && (
                            <Row justify="end" className="gx-m-0">
                                <Button htmlType="submit" type="primary">
                                    Cập nhật
                                </Button>
                            </Row>
                        )}
                    </FormComponent>
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <FormComponent onSubmit={() => {}}>
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
                        {isEditInfoPayment && (
                            <Row justify="end" className="gx-m-0">
                                <Button htmlType="submit" type="primary">
                                    Cập nhật
                                </Button>
                            </Row>
                        )}
                    </FormComponent>
                </Card>
            </Col>
        </Row>
    );
};

const TitleCardStyled = styled.div`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
`;

export default InformationTab;
