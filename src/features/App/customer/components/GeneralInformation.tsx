import IconAntd from '@/components/IconAntd';
import { Button, Card, Checkbox, Col, Descriptions, Form, InputNumber, Row, Skeleton, Space, Tabs } from 'antd';
import moment from 'moment';
import React from 'react';
import { DataTypeWalletChange } from './Customer.Config';
import { CustomerService, WalletChangeService } from '../service';
import { useQuery } from 'react-query';
import CountUp from 'react-countup';
import { DescriptionStyled, TitleCardDes } from '@/config/global.style';
import TopBar from '@/components/TopBar';
import ModalComponent from '@/components/ModalComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import { rules } from '../../voucher/rules';
import { currencyFormat, Notification, wait } from '@/utils';
import SaveButton from '@/components/Button/Save.Button';
import TagResult from '@/components/TagResult';
import { Rule } from 'antd/lib/form';

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
const GeneralInformation = ({ customerId, disabled }: { customerId: number; disabled: boolean }) => {
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
        form.setFieldsValue({ debt: '' });
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

    const submitFormDebt = (values: any) => {
        if (values?.isApplyDebit && (!values?.maxDebit || !values?.maxDebitTime))
            return Notification('warning', 'Vui lòng nhập đầy đủ thông tin');

        CustomerService.addDebt(customerId, {
            isApplyDebit: values?.isApplyDebit ? 1 : 0,
            maxDebit: values?.maxDebit || 0,
            maxDebitTime: values?.maxDebitTime || 0,
        }).then((res) => {
            if (res.status) {
                Notification('success', 'Áp dụng thành công công nợ');
                refetch();
                setModalVisible(false);
                form.setFieldsValue({ debt: '' });
            }
        });
    };

    return (
        <>
            <Row gutter={[24, 24]}>
                <Col span={14}>
                    <DescriptionStyled
                        size="small"
                        labelStyle={{ width: '180px' }}
                        title="Thông tin khách hàng"
                        column={2}
                        bordered
                    >
                        <Descriptions.Item span={2} label="Tên khách hàng">
                            {generalInformation?.fullName || '--'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại" span={2}>
                            {generalInformation?.phoneNumber || '--'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh" span={2}>
                            {generalInformation?.dateOfBirth
                                ? moment(generalInformation.dateOfBirth).format('DD/MM/YYYY')
                                : '--'}
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="Địa chỉ">
                            {generalInformation?.address || '--'}
                        </Descriptions.Item>

                        <Descriptions.Item span={2} label="Điểm tích lũy">
                            {generalInformation?.wallet?.point} điểm
                        </Descriptions.Item>
                        <Descriptions.Item span={2} label="Trạng thái công nợ">
                            {generalInformation?.isApplyDebit ? (
                                <TagResult color="green" text="Đang áp dụng" />
                            ) : (
                                <TagResult color="error" text="Không áp dụng" />
                            )}
                        </Descriptions.Item>
                        {generalInformation?.isApplyDebit && (
                            <>
                                <Descriptions.Item span={2} label="Hạn mức công nợ">
                                    {currencyFormat(generalInformation?.maxDebit)} VNĐ
                                </Descriptions.Item>
                                <Descriptions.Item span={2} label="Thời gian công nợ">
                                    {generalInformation?.maxDebitTime} ngày
                                </Descriptions.Item>
                            </>
                        )}
                    </DescriptionStyled>
                </Col>
                <Col span={10}>
                    {/* <TopBar title={<TitleCardDes>Tổng quan bán hàng</TitleCardDes>}></TopBar> */}
                    <Row className="gx-mb-4 gx-mx-0" justify="space-between" align="middle">
                        <TitleCardDes>Tổng quan bán hàng</TitleCardDes>
                        <Button
                            disabled={disabled}
                            onClick={() => {
                                setModalVisible(true);
                                form.setFieldsValue({
                                    isApplyDebit: generalInformation?.isApplyDebit,
                                    maxDebit: generalInformation?.maxDebit || undefined,
                                    maxDebitTime: generalInformation?.maxDebitTime || undefined,
                                });
                            }}
                            type="primary"
                        >
                            Áp dụng công nợ
                        </Button>
                    </Row>
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
                                    onSubmit={submitFormDebt}
                                >
                                    <Row gutter={[20, 0]}>
                                        <FormItemComponent
                                            name="isApplyDebit"
                                            label=""
                                            valuePropName="checked"
                                            inputField={
                                                <Checkbox>
                                                    <strong>Áp dụng công nợ</strong>
                                                </Checkbox>
                                            }
                                        />
                                        <FormItemComponent
                                            rules={[
                                                rules.required('Vui lòng nhập hạn mức công nợ!'),
                                                () => ({
                                                    validator(_: Rule, value: string) {
                                                        if (value?.toString()?.length > 0 && +value < 1) {
                                                            return Promise.reject(
                                                                new Error('Hạn mức công nợ phải lớn hơn 0!')
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                            name="maxDebit"
                                            label="Hạn mức công nợ"
                                            inputField={
                                                <InputNumber
                                                    addonAfter="VNĐ"
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '')
                                                    }
                                                    parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                                    placeholder="Nhập hạn mức công nợ"
                                                />
                                            }
                                        />
                                        <FormItemComponent
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập thời gian công nợ!',
                                                },
                                                () => ({
                                                    validator(_: Rule, value: string) {
                                                        if (value?.toString()?.length > 0 && +value < 1) {
                                                            return Promise.reject(
                                                                new Error('Thời gian công nợ phải lớn hơn 0!')
                                                            );
                                                        }

                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                            name="maxDebitTime"
                                            label="Thời gian công nợ"
                                            inputField={
                                                <InputNumber
                                                    addonAfter="Ngày"
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '')
                                                    }
                                                    parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                                    placeholder="Nhập thời gian công nợ"
                                                />
                                            }
                                        />
                                    </Row>
                                    <Row style={{ width: '100%' }} align="bottom">
                                        <Space>
                                            <Button type="default" onClick={handleCloseModal}>
                                                Thoát
                                            </Button>
                                            <SaveButton htmlType="submit" />
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
