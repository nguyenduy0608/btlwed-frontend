import TagResult from '@/components/TagResult';
import { DescriptionStyled } from '@/config/global.style';
import { Col, Descriptions, Row } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
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
                        <p className="gx-mb-0 gx-font-weight-bold">{title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

const InformationTab = ({ info }: { info: any }) => {
    return (
        <Row>
            <Col span={14}>
                <DescriptionStyled
                    size="small"
                    labelStyle={{ width: '180px' }}
                    title="Thông tin gian hàng"
                    column={2}
                    bordered
                >
                    <Descriptions.Item span={2} label="Tên gian hàng">
                        {info?.name || '--'}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label="Client_ID">
                        {info?.clientId || '--'}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label="Secret_ID">
                        {info?.clientSecret || '--'}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label="Trạng thái">
                        {info?.status ? (
                            <TagResult text="Đang đồng bộ" color="processing" />
                        ) : (
                            <TagResult text="Ngưng đồng bộ" color="error" />
                        )}
                    </Descriptions.Item>
                </DescriptionStyled>
            </Col>
            <Col span={10}>
                <Row>
                    <Col span={12}>
                        <CardInfo
                            index={0}
                            title="Số sản phẩm"
                            value={<CountUp separator=" " end={info?.nProducts} />}
                        />
                    </Col>
                    <Col span={12}>
                        <CardInfo index={1} title="Số đơn hàng" value={<CountUp separator=" " end={info?.nOrders} />} />
                    </Col>
                    <Col span={12}>
                        <CardInfo index={2} title="Số khách hàng" value={<CountUp separator=" " end={info?.nUser} />} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default InformationTab;
