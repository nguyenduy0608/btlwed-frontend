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
        countEmployee: number;
        countDepartment: number;
        countContract: number;
        countAdmin: number;
    };
}) => {
    const navigate = useNavigate();

    return (
        <Row className="gx-px-2" style={{}}>
            <Col
                xl={12}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="gx-px-3 gx-py-2"
                onClick={() => {
                    navigate(routerPage.employee);
                }}
            >
                <IconWithTextCard
                    icon={<UserIcon color="#1890ff" />}
                    title={<CountUp separator=" " end={countReport?.countEmployee || 0} />}
                    subTitle="Nhân viên"
                />
            </Col>
            <Col
                xl={12}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="gx-px-3 gx-py-2"
                onClick={() => {
                    navigate(routerPage.account);
                }}
            >
                <IconWithTextCard
                    icon={<UserIcon color="#998CEB" />}
                    title={<CountUp separator=" " end={countReport?.countAdmin || 0} />}
                    subTitle="Tài khoản"
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
                    navigate(routerPage.voucher);
                }}
            >
                <IconWithTextCard
                    icon={<ProductIcon color="#5BB318" />}
                    title={<CountUp separator=" " end={countReport?.countDepartment || 0} />}
                    subTitle="Phòng ban"
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
                    navigate(routerPage.contant);
                }}
            >
                <IconWithTextCard
                    icon={<OrderIcon color="#FF0000" />}
                    title={<CountUp separator=" " end={countReport?.countContract || 0} />}
                    subTitle="Hợp đồng"
                />
            </Col>
        </Row>
    );
};

export default React.memo(CardReport);
