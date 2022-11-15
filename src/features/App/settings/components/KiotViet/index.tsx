import { Card, Tabs } from 'antd';
import React from 'react';
import InformationTab from './Information.Tab';
import OrderTab from './Order.Tab';
import ProductTab from './Product.Tab';

const DetailKiotViet = ({ record }: { record: any }) => {
    const items = [
        { label: 'Thông tin gian hàng', key: 'item-1', children: <InformationTab info={record} /> },
        { label: 'Sản phẩm', key: 'item-2', children: <ProductTab kiotvietId={record.id} /> },
        { label: 'Đơn hàng', key: 'item-3', children: <OrderTab kiotvietId={record.id} /> },
    ];
    return (
        <Card className="gx-mb-0">
            <Tabs items={items} />
        </Card>
    );
};

export default DetailKiotViet;
