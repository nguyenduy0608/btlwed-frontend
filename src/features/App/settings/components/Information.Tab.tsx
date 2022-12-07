import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import UploadComponent from '@/components/Upload';
import useCallContext from '@/hooks/useCallContext';
import { Button, Card, Col, Form, Input, InputNumber, message, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { settingService } from '../service';

const InformationTab = () => {
    const { state } = useCallContext();
    const [isEditPoint, setIsEditPoint] = React.useState(false);
    const [isEditContact, setIsEditContact] = React.useState(false);
    const [isEditInfoPayment, setIsEditInfoPayment] = React.useState(false);

    // chỗ này xử lý tích điểm
    const [formPoint] = Form.useForm();
    const pointCurrent = React.useRef(0);
    const [callbackPoint, setCallbackPoint] = React.useState(false);
    React.useEffect(() => {
        settingService.getPoint().then((res) => {
            formPoint.setFieldsValue({ point: res?.data?.value || 0 });
            pointCurrent.current = res?.data?.value || 0;
        });
    }, [callbackPoint]);
    const handleSubmitChangePoint = (values: any) => {
        settingService.updatePoint(values.point).then((res) => {
            message.success('Cập nhật thành công % tích điểm');
            setCallbackPoint(!callbackPoint);
            setIsEditPoint(false);
        });
    };

    // chỗ này xử lý thông tin liên hệ
    const [formContact] = Form.useForm();
    const zaloCurrent = React.useRef(0);
    const facebookCurrent = React.useRef(0);
    const zaloLive = Form.useWatch('linkZalo', formContact);
    const fbLive = Form.useWatch('linkFacebook', formContact);
    const [callbackContact, setCallbackContact] = React.useState(false);
    React.useEffect(() => {
        settingService.getContact().then((res) => {
            formContact.setFieldsValue({
                linkFacebook: res?.data?.value?.linkFacebook,
                linkZalo: res?.data?.value?.linkZalo,
            });
            zaloCurrent.current = res?.data?.value?.linkZalo;
            facebookCurrent.current = res?.data?.value?.linkFacebook;
        });
    }, [callbackContact]);
    const handleSubmitChangeContact = (values: any) => {
        settingService.updateContact(values).then((res) => {
            message.success('Cập nhật thành công thông tin liên hệ');
            setCallbackContact(!callbackContact);
            setIsEditPoint(false);
        });
    };

    // chỗ này xử lý thôgn tin tài khoản
    const [formBank] = Form.useForm();
    const [callbackBank, setCallbackBank] = React.useState(false);

    React.useEffect(() => {
        settingService.getPayment().then((res) => {
            console.log('🚀 ~ file: Information.Tab.tsx:41 ~ settingService.getContact ~ res', res);
            // formContact.setFieldsValue({
            //     linkFacebook: res?.data?.value?.linkFacebook,
            //     linkZalo: res?.data?.value?.linkZalo,
            // });
            // zaloCurrent.current = res?.data?.value?.linkZalo;
            // facebookCurrent.current = res?.data?.value?.linkFacebook;
        });
    }, [callbackBank]);

    return (
        <Row gutter={[12, 0]}>
            <Col span={12}>
                <Card className="gx-mb-4">
                    <FormComponent form={formPoint} onSubmit={handleSubmitChangePoint}>
                        <TitleCardStyled>Tích điểm</TitleCardStyled>

                        <FormItemComponent
                            label="% tích điểm"
                            name="point"
                            inputField={
                                <InputNumber
                                    onChange={(value) => {
                                        if (value != pointCurrent.current) {
                                            setIsEditPoint(true);
                                        } else {
                                            setIsEditPoint(false);
                                        }
                                    }}
                                    min={0}
                                    max={100}
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                    placeholder="Nhập tổng giá trị"
                                />
                            }
                        />
                        {isEditPoint && (
                            <Row justify="end" className="gx-m-0">
                                <Button htmlType="submit" type="primary">
                                    Cập nhật
                                </Button>
                            </Row>
                        )}
                    </FormComponent>
                </Card>

                <Card>
                    <FormComponent form={formContact} onSubmit={handleSubmitChangeContact}>
                        <TitleCardStyled>Thông tin liên hệ</TitleCardStyled>

                        <FormItemComponent
                            label="Zalo"
                            name="linkZalo"
                            inputField={<Input placeholder="https://zalo.me" />}
                        />
                        <FormItemComponent
                            label="Facebook"
                            name="linkFacebook"
                            inputField={<Input placeholder="https://www.facebook.com" />}
                        />
                        {(zaloLive !== zaloCurrent.current || fbLive !== facebookCurrent.current) && (
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
                    <FormComponent form={formBank} onSubmit={() => {}}>
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
