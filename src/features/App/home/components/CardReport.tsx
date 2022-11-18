import OrderIcon from '@/assets/icons/Order.Icon';
import ProductIcon from '@/assets/icons/Product.Icon';
import TurnoverIcon from '@/assets/icons/Turnover.Icon';
import UserIcon from '@/assets/icons/User.Icon';
import { FileWordOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import IconWithTextCard from './IconWithTextCard';

const CardReport = () => {
    return (
        <Row gutter={10}>
            <Col xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full">
                <IconWithTextCard icon={<TurnoverIcon color="#1890ff" />} title="1" subTitle="Doanh thu đơn hàng" />
            </Col>
            <Col xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full">
                <IconWithTextCard icon={<UserIcon color="#998CEB" />} title="2" subTitle="Khách hàng" />
            </Col>
            <Col xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full">
                <IconWithTextCard icon={<ProductIcon color="#5BB318" />} title="3" subTitle="Sản phẩm" />
            </Col>
            <Col xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full">
                <IconWithTextCard icon={<OrderIcon color="#FF0000" />} title="4" subTitle="Đơn hàng" />
            </Col>
        </Row>
    );
};

export default React.memo(CardReport);
