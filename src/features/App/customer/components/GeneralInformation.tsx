import IconAntd from '@/components/IconAntd';
import { Button, Card, Checkbox, Col, Descriptions, Form, InputNumber, Row, Skeleton, Space, Tabs } from 'antd';
import moment from 'moment';
import React from 'react';
import {  DataTypeWalletChange } from './Customer.Config';
import { CustomerService, WalletChangeService } from '../service';
import { useQuery } from 'react-query';
import CountUp from 'react-countup';
import { DescriptionStyled, TitleCardDes } from '@/config/global.style';
import TopBar from '@/components/TopBar';
import ModalComponent from '@/components/ModalComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import { rules } from '../../voucher/rules';
import { Notification, wait } from '@/utils';

const CardInfo = React.memo(({ index, title, value }: { index: number; title: string; value: any }) => {
    return (
        <div
            className={`ant-card ant-card-bordered gx-card-widget gx-card-full gx-p-3 ${
                index === 0 ? 'gx-bg-cyan' : index === 1 ? 'gx-bg-orange' : index === 2 ? 'gx-bg-teal' : 'gx-bg-red'
            } gx-text-white`}
        >
            <div className="ant-card-body">
                <div className="gx-media gx-align-items-center gx-flex-nowrap">
                    <div className="gx-mr-2 gx-mr-xxl-3">
                        <i className="icon icon-diamond gx-fs-icon-lg"></i>
                    </div>
                    <div className="gx-media-body">
                        <h1 className="gx-fs-xxl gx-font-weight-semi-bold gx-mb-1 gx-text-white">{value}</h1>
                        <p className="gx-mb-0">{title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

const initialValue = {};
const GeneralInformation = ({ customerId }: { customerId: number }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [values, setValues] = React.useState<DataTypeWalletChange | null>(null);
    const [form] = Form.useForm();

    const { data, isLoading, refetch, isRefetching } = useQuery<any>(['generalInformation', customerId], () =>
        CustomerService.detail(customerId)
    );
    const generalInformation = data?.data;

    const handleShowModal = (record: DataTypeWalletChange) => {
        setModalVisible(true);
        setValues(record);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setValues(null);
        formReset();
    };
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };

    // React.useEffect(() => {
    //     if (values) {
    //         setLoadingModal(true);
    //         form.setFieldsValue(values || initialValue);
    //         wait(500).then(() => setLoadingModal(false));
    //     }
    // }, [values]);
    // const handleSubmit = React.useCallback(
    //     async (data: DataTypeWalletChange) => {
    //         setLoadingModal(true);
    //         if (values) {
    //             console.log('values:', values);
    //             const res = await WalletChangeService.create(values.id, { order: data.order });
    //             if (res.status === 1) {
    //                 refetch();
    //                 Notification('success', 'Sửa danh mục thành công');
    //                 handleCloseModal();
    //                 formReset();
    //             }
    //         }

    //         setLoadingModal(false);
    //     },
    //     [values]
    // );
    return (
        <>
            <Row gutter={[24, 24]}>
                <Col span={14}>
                    <DescriptionStyled labelStyle={{ width: '180px' }} title="Thông tin khách hàng" column={2} bordered>
                        <Descriptions.Item
                            labelStyle={{ textAlign: 'center' }}
                            label={<IconAntd icon="UserOutlined" />}
                        >
                            {generalInformation?.fullName || '--'}
                        </Descriptions.Item>
                        <Descriptions.Item
                            labelStyle={{ textAlign: 'center' }}
                            label={<IconAntd icon="PhoneOutlined" />}
                        >
                            {generalInformation?.phoneNumber || '--'}
                        </Descriptions.Item>
                        <Descriptions.Item
                            labelStyle={{ textAlign: 'center' }}
                            label={<IconAntd icon="ScheduleOutlined" />}
                        >
                            {generalInformation?.dateOfBirth
                                ? moment(generalInformation.dateOfBirth).format('DD/MM/YYYY')
                                : '--'}
                        </Descriptions.Item>
                        <Descriptions.Item
                            labelStyle={{ textAlign: 'center' }}
                            label={<IconAntd icon="EnvironmentOutlined" />}
                        >
                            {generalInformation?.address || '--'}
                        </Descriptions.Item>

                        <Descriptions.Item span={2} label="Điểm tích lũy">
                            {generalInformation?.wallet?.point}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="Hạn mức công nợ">
                            {generalInformation?.maxDebit}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian công nợ">
                            {generalInformation?.maxDebitTime} ngày
                        </Descriptions.Item>
                    </DescriptionStyled>
                </Col>
                <Col span={10}>
                    {/* <TopBar title={<TitleCardDes>Tổng quan bán hàng</TitleCardDes>}></TopBar> */}
                    <TitleCardDes>
                        Tổng quan bán hàng
                        <Button onClick={() => setModalVisible(true)} className="gx-mb-0" type="primary">
                            Thêm mới
                        </Button>
                    </TitleCardDes>
                    <div>
                        <Row>
                            <Col span={12}>
                                <CardInfo
                                    index={0}
                                    title="Doanh số"
                                    value={<CountUp separator=" " end={generalInformation?.turnoverOfOrder || 0} />}
                                />
                            </Col>
                            <Col span={12}>
                                <CardInfo
                                    index={1}
                                    title="Công nợ"
                                    value={<CountUp separator=" " end={generalInformation?.debt || 0} />}
                                />
                            </Col>
                            <Col span={12}>
                                <CardInfo
                                    index={2}
                                    title="Sản phẩm"
                                    value={<CountUp end={generalInformation?.totalProductBought || 0} />}
                                />
                            </Col>
                            <Col span={12}>
                                <CardInfo
                                    index={3}
                                    title="Đơn hàng"
                                    value={<CountUp end={generalInformation?.totalOrder || 0} />}
                                />
                            </Col>
                            <ModalComponent title="Áp công nợ" modalVisible={modalVisible} loading={loadingModal}>
                                <FormComponent
                                    layoutType="vertical"
                                    form={form}
                                    initialValues={initialValue}
                                    onSubmit={() => {}}
                                >
                                    <Row gutter={[20, 0]}>
                                        <FormItemComponent
                                            name=""
                                            label=""
                                            valuePropName="checked"
                                            inputField={
                                                <Checkbox>
                                                    <strong>Áp dụng công nợ</strong>
                                                </Checkbox>
                                            }
                                        />
                                        <FormItemComponent
                                            // rules={[rules.required('Vui lòng nhập hạn mức công nợ!')]}
                                            name=""
                                            label="Hạn mức công nợ"
                                            inputField={
                                                <InputNumber
                                                    min={0}
                                                    max={10000000}
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                    parser={(value: any) =>
                                                        value ? value.replace(/\$\s?|(,*)/g, '') : ''
                                                    }
                                                    placeholder="Nhập hạn mức công nợ"
                                                />
                                            }
                                        />
                                        <FormItemComponent
                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         message: 'Vui lòng nhập thời gian công nợ đơn hàng!',
                                            //     },
                                            // ]}
                                            name=""
                                            label="Thời gian công nợ đơn hàng"
                                            inputField={
                                                <InputNumber
                                                    min={0}
                                                    max={99}
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                    parser={(value: any) =>
                                                        value ? value.replace(/\$\s?|(,*)/g, '') : ''
                                                    }
                                                    placeholder="Nhập thời gian công nợ đơn hàng"
                                                />
                                            }
                                        />
                                    </Row>
                                    <Row style={{ width: '100%' }} align="bottom">
                                        <Space>
                                            <Button type="default" onClick={handleCloseModal}>
                                                Thoát
                                            </Button>
                                            <Button type="primary" htmlType="submit">
                                                Lưu
                                            </Button>
                                        </Space>
                                    </Row>
                                </FormComponent>
                            </ModalComponent>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default GeneralInformation;