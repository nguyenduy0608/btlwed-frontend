import { Card, Tabs } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InformationTab from './Information.Tab';
import OrderTab from './Order.Tab';
import ProductTab from './Product.Tab';

const DetailKiotViet = ({ record }: { record: any }) => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    if (search) {
        var params = search.substring(1);
        var searchParams = JSON.parse(
            '{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function (key, value) {
                return key === '' ? value : decodeURIComponent(value);
            }
        );
    }

    const [tabIndex, setTabIndex] = React.useState('info_kiotviet');
    console.log('🚀 ~ file: index.tsx:22 ~ DetailKiotViet ~ tabIndex', tabIndex);

    const items = [
        { label: 'Thông tin gian hàng', key: 'info_kiotviet', children: <InformationTab info={record} /> },
        { label: 'Sản phẩm', key: 'products', children: <ProductTab kiotvietId={record.id} /> },
        { label: 'Đơn hàng', key: 'orders', children: <OrderTab kiotvietId={record.id} /> },
    ];

    React.useEffect(() => {
        if (!searchParams?.sub_tab) return;

        setTabIndex(searchParams?.sub_tab);
    }, [searchParams?.sub_tab]);

    return (
        <Card className="gx-mb-0">
            <Tabs
                activeKey={tabIndex}
                onChange={(key) => {
                    navigate(`${pathname}?tab=${searchParams?.tab}&sub_tab=${key}`);
                    setTabIndex(key);
                }}
                items={items}
            />
        </Card>
    );
};

export default DetailKiotViet;
