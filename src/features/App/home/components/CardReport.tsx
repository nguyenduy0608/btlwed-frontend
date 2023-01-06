import OrderIcon from '@/assets/icons/Order.Icon';
import ProductIcon from '@/assets/icons/Product.Icon';
import TurnoverIcon from '@/assets/icons/Turnover.Icon';
import UserIcon from '@/assets/icons/User.Icon';
import { FileWordOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import IconWithTextCard from './IconWithTextCard';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { routerPage } from '@/config/contants.routes';

const CardReport = ({
    countReport,
}: {
    countReport: {
        countUsers: number;
        countRevenue: number;
        countProducts: number;
        countOrders: number;
    };
}) => {
    const navigate = useNavigate();

    return (
        <Row className="gx-px-2">
            <Col
                xl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="gx-px-3 gx-py-2"
                onClick={() => {
                    navigate(routerPage.reportSell);
                }}
            >
                <IconWithTextCard
                    icon={<TurnoverIcon color="#1890ff" />}
                    title={<CountUp separator=" " end={countReport?.countRevenue || 0} />}
                    subTitle="Doanh thu"
                />
            </Col>
            <Col
                xl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="gx-px-3 gx-py-2"
                onClick={() => {
                    navigate(routerPage.customer);
                }}
            >
                <IconWithTextCard
                    icon={<UserIcon color="#998CEB" />}
                    title={<CountUp separator=" " end={countReport?.countUsers || 0} />}
                    subTitle="Khách hàng"
                />
            </Col>
            <Col
                xl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="gx-px-3 gx-py-2"
                onClick={() => {
                    navigate(routerPage.product);
                }}
            >
                <IconWithTextCard
                    icon={<ProductIcon color="#5BB318" />}
                    title={<CountUp separator=" " end={countReport?.countProducts || 0} />}
                    subTitle="Sản phẩm"
                />
            </Col>
            <Col
                xl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="gx-px-3 gx-py-2"
                onClick={() => {
                    navigate(routerPage.order);
                }}
            >
                <IconWithTextCard
                    icon={<OrderIcon color="#FF0000" />}
                    title={<CountUp separator=" " end={countReport?.countOrders || 0} />}
                    subTitle="Đơn hàng"
                />
            </Col>
        </Row>
    );
};

export default React.memo(CardReport);
