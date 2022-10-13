import React from 'react';
import { Button, Card, DatePicker, Descriptions, Input, Segmented, Switch } from 'antd';
import Buttons from './Buttons';

const Description = () => {
    return (
        <Card className="gx-mb-0" actions={Buttons()}>
            <Descriptions title="Thông tin mã giảm giá" column={2}>
                <Descriptions.Item label="Mã voucher">KM001</Descriptions.Item>
                <Descriptions.Item label="Ngày bắt đầu">19/07/2020</Descriptions.Item>
                <Descriptions.Item label="Tên voucher">Mua hóa đơn 10tr giảm 2%</Descriptions.Item>
                <Descriptions.Item label="Ngày kết thúc">20/08/2010</Descriptions.Item>
                <Descriptions.Item label="Số lượng quy định">20</Descriptions.Item>
                <Descriptions.Item label="Số lượng còn lại">10</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default React.memo(Description);
