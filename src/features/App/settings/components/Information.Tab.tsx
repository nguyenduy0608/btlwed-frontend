import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import UploadComponent from '@/components/Upload';
import useCallContext from '@/hooks/useCallContext';
import { uuid } from '@/utils';
import { Button, Card, Col, Form, Input, InputNumber, message, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { rules } from '../../voucher/rules';
import { settingService } from '../service';

const InformationTab = () => {
    const { state } = useCallContext();
    const [isEditPoint, setIsEditPoint] = React.useState(false);
    const [isEditInitPoint, setIsEditInitPoint] = React.useState(false);
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
        settingService.updatePoint(values.point.toString()).then((res) => {
            message.success('Cập nhật thành công % tích điểm');
            setCallbackPoint(!callbackPoint);
            setIsEditPoint(false);
        });
    };

    // chỗ này xử lý điểm tích lũy
    const [formInitPoint] = Form.useForm();
    const initPointCurrent = React.useRef(0);
    const [callbackInitPoint, setCallbackInitPoint] = React.useState(false);
    React.useEffect(() => {
        settingService.getInitPoint().then((res) => {
            formInitPoint.setFieldsValue({ initPoint: res?.data?.value || 0 });
            initPointCurrent.current = res?.data?.value;
        });
    }, [callbackInitPoint]);
    const handleSubmitChangeInitPoint = (values: any) => {
        settingService.updateInitPoint(values.initPoint.toString()).then((res) => {
            message.success('Cập nhật thành công điểm tích lũy');
            setCallbackInitPoint(!callbackInitPoint);
            setIsEditInitPoint(false);
        });
    };

    // chỗ này xử lý thông tin liên hệ
    const [formContact] = Form.useForm();
    const zaloCurrent = React.useRef('');
    const facebookCurrent = React.useRef('');
    const zaloLive = Form.useWatch('linkZalo', formContact);
    const fbLive = Form.useWatch('linkFacebook', formContact);
    const [callbackContact, setCallbackContact] = React.useState(false);
    const [reRender, setReRender] = React.useState(false);

    React.useEffect(() => {
        settingService.getContact().then((res) => {
            zaloCurrent.current = res?.data?.value?.linkZalo;
            facebookCurrent.current = res?.data?.value?.linkFacebook;
            formContact.setFieldsValue({
                linkFacebook: res?.data?.value?.linkFacebook,
                linkZalo: res?.data?.value?.linkZalo,
            });
            setReRender(!reRender);
        });
    }, [callbackContact]);

    const handleSubmitChangeContact = (values: any) => {
        settingService.updateContact(values).then((res) => {
            message.success('Cập nhật thành công thông tin liên hệ');
            setCallbackContact(!callbackContact);
            setIsEditPoint(false);
            setIsEditInitPoint(false);
        });
    };

    // chỗ này xử lý thôgn tin tài khoản
    const [formBank] = Form.useForm();
    const [callbackBank, setCallbackBank] = React.useState(false);

    // giá trị ban đầu
    const qrCodeCurrent = React.useRef<any>(null);
    const bankNameCurrent = React.useRef('');
    const bankAccountNumberCurrent = React.useRef('');
    const bankAccountNameCurrent = React.useRef('');

    // giá trị thực
    const qrCodeLive = Form.useWatch('bankQrCode', formBank);
    const bankNameLive = Form.useWatch('bankName', formBank);
    const bankAccountNumberLive = Form.useWatch('bankAccountNumber', formBank);
    const bankAccountNameLive = Form.useWatch('bankAccountName', formBank);

    React.useEffect(() => {
        settingService.getPayment().then((res) => {
            formBank.setFieldsValue({
                bankName: res?.data?.value?.bankName,
                bankAccountNumber: res?.data?.value?.bankAccountNumber,
                bankAccountName: res?.data?.value?.bankAccountName,
            });
            qrCodeCurrent.current = [{ url: res?.data?.value?.bankQrCode, uid: uuid(), name: 'demo' }];
            bankNameCurrent.current = res?.data?.value?.bankName;
            bankAccountNumberCurrent.current = res?.data?.value?.bankAccountNumber;
            bankAccountNameCurrent.current = res?.data?.value?.bankAccountName;
        });
    }, [callbackBank]);

    React.useEffect(() => {
        if (
            bankNameCurrent.current != bankNameLive ||
            bankAccountNumberCurrent.current != bankAccountNumberLive ||
            bankAccountNameCurrent.current != bankAccountNameLive ||
            qrCodeLive
        ) {
            setIsEditInfoPayment(true);
        } else {
            setIsEditInfoPayment(false);
        }
    }, [bankNameLive, bankAccountNameLive, bankAccountNumberLive, qrCodeLive]);

    const handleSubmitChangeBank = (values: any) => {
        const formData = new FormData();

        values?.bankQrCode && formData.append('file', values.bankQrCode);
        formData.append('bank_name', values.bankName?.trim());
        formData.append('bank_account_number', values.bankAccountNumber);
        formData.append('bank_account_name', values.bankAccountName?.trim());
        settingService.updatePayment(formData).then((res) => {
            message.success('Cập nhật thành công thông tin tài khoản');
            setCallbackBank(!callbackBank);
            setIsEditInfoPayment(false);
        });
    };

    return (
        <Row gutter={[12, 0]}>
            <Col span={12}>
                <Card className="gx-mb-4">
                    <FormComponent form={formPoint} onSubmit={handleSubmitChangePoint}>
                        <TitleCardStyled>Tích điểm</TitleCardStyled>

                        <FormItemComponent
                            label="% tích điểm"
                            name="point"
                            // validateStatus="error"
                            // extra="Nhập giá trị > 0"
                            rules={[
                                {
                                    message: 'Vui lòng nhập % tích điểm',
                                    validator: (_: any, value: number) => {
                                        if (value <= 0) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                            inputField={
                                <InputNumber
                                    onChange={(value) => {
                                        if (value != pointCurrent.current) {
                                            setIsEditPoint(true);
                                        } else {
                                            setIsEditPoint(false);
                                        }
                                    }}
                                    type="number"
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
                <Card className="gx-mb-4">
                    <FormComponent form={formInitPoint} onSubmit={handleSubmitChangeInitPoint}>
                        <TitleCardStyled>Điểm tích lũy cho khách hàng mới</TitleCardStyled>

                        <FormItemComponent
                            label="Điểm tích lũy"
                            name="initPoint"
                            rules={[
                                {
                                    message: 'Vui lòng nhập điểm tích lũy',
                                    validator: (_: any, value: number) => {
                                        if (value <= 0) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                            inputField={
                                <InputNumber
                                    onChange={(value) => {
                                        if (value != initPointCurrent.current) {
                                            setIsEditInitPoint(true);
                                        } else {
                                            setIsEditInitPoint(false);
                                        }
                                    }}
                                    // type="number"
                                    style={{ width: '100%' }}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                    placeholder="Nhập tổng giá trị"
                                />
                            }
                        />
                        {isEditInitPoint && (
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
                            label="Messenger"
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
                    <FormComponent form={formBank} onSubmit={handleSubmitChangeBank}>
                        <TitleCardStyled>Thông tin chuyển khoản</TitleCardStyled>

                        <FormItemComponent
                            label="Tên ngân hàng"
                            name="bankName"
                            inputField={<Input placeholder="Nhập tên ngân hàng" />}
                            rules={[
                                {
                                    validator: (_: any, value: any) => {
                                        if (!value || value.trim() === '') {
                                            return Promise.reject(new Error('Vui lòng nhập tên ngân hàng!'));
                                        }

                                        return Promise.resolve();
                                    },
                                },
                                // {
                                //     validator: (_: any, value: any) => {
                                //         if (/\s/.test(value)) {
                                //             return Promise.reject(new Error('Vui lòng không nhập khoảng trắng!'));
                                //         }
                                //         return Promise.resolve();
                                //     },
                                // },
                            ]}
                        />
                        <FormItemComponent
                            label="Số tài khoản"
                            name="bankAccountNumber"
                            rules={[
                                {
                                    message: 'Số tài khoản sai định dạng',
                                    validator: (_: any, value: any) => {
                                        if (value === 0) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                            inputField={
                                <InputNumber
                                    style={{ width: '100%' }}
                                    parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                    placeholder="Nhập số tài khoản"
                                    controls={false}
                                    type="number"
                                />
                            }
                        />
                        <FormItemComponent
                            label="Tên tài khoản"
                            name="bankAccountName"
                            rules={[
                                {
                                    validator: (_: any, value: any) => {
                                        if (!value || value.trim() === '') {
                                            return Promise.reject(new Error('Vui lòng nhập tên tài khoản!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                                // {
                                //     validator: (_: any, value: any) => {
                                //         if (value.trim() === '') {
                                //             return Promise.reject(new Error('Vui lòng nhập tên tài khoản!'));
                                //         }
                                //         return Promise.resolve();
                                //     },
                                // },
                            ]}
                            inputField={<Input placeholder="Nhập tên tài khoản" />}
                        />
                        <FormItemComponent
                            label="QR code"
                            name="bankQrCode"
                            inputField={
                                <UploadComponent
                                    // isUploadServerWhenUploading
                                    initialFile={qrCodeCurrent.current}
                                    uploadType="list"
                                    listType="picture-card"
                                    maxLength={1}
                                    onSuccessUpload={(url: any) => {
                                        formBank.setFieldValue('bankQrCode', url?.originFileObj);
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
