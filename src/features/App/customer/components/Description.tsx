import React from 'react';
import { Button, Card, Col, Descriptions, Row, Table, Tabs, Tag } from 'antd';
import { UserOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { DataTypeCustomer } from './Customer.Config';
import { momentToStringDate } from '@/utils';
import dayjs from 'dayjs';
import TagResult from '@/components/TagResult';
import IconAntd from '@/components/IconAntd';
import PuchaseHistoryPage from '../pages/purchaseHistory';
import DebtPage from '../pages/Debt';
import Container from '@/layout/Container';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import WalletChangePage from '../pages/WalletChange';
interface IProps {
    record: DataTypeCustomer;
    refetch: any;
}
const Description: React.FC<IProps> = ({ record, refetch }) => {
    return (
        <Card className="gx-mb-0">
            <Tabs>
                <Tabs.TabPane tab="Thông tin chung" key="1">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Descriptions title="Thông tin khách hàng" column={2} bordered>
                                <Descriptions.Item label={<IconAntd icon="UserOutlined" />}>
                                    {record.fullName || '--'}
                                </Descriptions.Item>
                                <Descriptions.Item label={<IconAntd icon="PhoneOutlined" />}>
                                    {record.phoneNumber || '--'}
                                </Descriptions.Item>
                                <Descriptions.Item label={<IconAntd icon="UserOutlined" />}>
                                    {record.dateOfBirth || '--'}
                                </Descriptions.Item>
                                <Descriptions.Item label={<IconAntd icon="EnvironmentOutlined" />}>
                                    {record.address || '--'}
                                </Descriptions.Item>

                                <Descriptions.Item span={3} label="Điểm tích lũy">
                                    {record.fullName || '--'}
                                </Descriptions.Item>
                                <Descriptions.Item span={3} label="Hạn mức công nợ">
                                    {record.fullName || '--'}
                                </Descriptions.Item>
                                <Descriptions.Item span={3} label="Thời gian công nợ">
                                    {record.fullName || '--'}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={12}>
                            <Descriptions title="Tổng quan bán hàng" column={2} bordered>
                                <Descriptions.Item label="Doanh số trên đơn hàng">
                                    {record.turnoverOfOrder || '--'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Công nợ hiện tại">{'--'}</Descriptions.Item>
                                <Descriptions.Item label="Sản phẩm đã mua">{'--'}</Descriptions.Item>
                                <Descriptions.Item label="Tổng đơn hàng">
                                    {record.totalProductBought || '--'}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Thông tin mua hàng" key="2">
                    <PuchaseHistoryPage />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Công nợ" key="3">
                    <DebtPage />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Lịch sử tích điểm" key="4">
                    <WalletChangePage />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
};

export default React.memo(Description);
