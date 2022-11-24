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
        <Row className="gx-px-2">
            <Col xl={12} lg={12} md={12} sm={24} xs={24} className="gx-px-3 gx-py-2">
                <IconWithTextCard icon={<TurnoverIcon color="#1890ff" />} title="1" subTitle="Doanh thu" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24} className="gx-px-3 gx-py-2">
                <IconWithTextCard icon={<UserIcon color="#998CEB" />} title="2" subTitle="Khách hàng" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24} className="gx-px-3 gx-py-2">
                <IconWithTextCard icon={<ProductIcon color="#5BB318" />} title="3" subTitle="Sản phẩm" />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24} className="gx-px-3 gx-py-2">
                <IconWithTextCard icon={<OrderIcon color="#FF0000" />} title="4" subTitle="Đơn hàng" />
            </Col>
        </Row>
    );
};

export default React.memo(CardReport);
