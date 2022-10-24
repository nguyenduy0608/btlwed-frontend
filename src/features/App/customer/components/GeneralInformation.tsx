import IconAntd from '@/components/IconAntd';
import { Card, Col, Descriptions, Row, Skeleton, Tabs } from 'antd';
import moment from 'moment';
import React from 'react';
import DebtPage from './Debt';
import PuchaseHistoryPage from './purchaseHistory';
import WalletChangePage from './WalletChange';
import { DataTypeCustomer } from './Customer.Config';
import { CustomerService } from '../service';
import { useQuery } from 'react-query';
import CountUp from 'react-countup';
import { DescriptionStyled, TitleCardDes } from '@/config/global.style';

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

const GeneralInformation = ({ customerId }: { customerId: number }) => {
    const { data, isLoading, refetch, isRefetching } = useQuery<any>(['generalInformation', customerId], () =>
        CustomerService.detail(customerId)
    );
    const generalInformation = data?.data;

    return (
        <Row gutter={[24, 24]}>
            <Col span={14}>
                <DescriptionStyled labelStyle={{ width: '180px' }} title="Thông tin khách hàng" column={2} bordered>
                    <Descriptions.Item labelStyle={{ textAlign: 'center' }} label={<IconAntd icon="UserOutlined" />}>
                        {generalInformation?.fullName || '--'}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={{ textAlign: 'center' }} label={<IconAntd icon="PhoneOutlined" />}>
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
                <TitleCardDes>Tổng quan bán hàng</TitleCardDes>
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
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default GeneralInformation;
