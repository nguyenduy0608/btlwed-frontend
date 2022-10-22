import { Card, Tabs } from 'antd';
import React from 'react';
import { DataTypeCustomer } from './Customer.Config';
import DebtPage from './Debt';
import GeneralInformation from './GeneralInformation';
import PuchaseHistoryPage from './purchaseHistory';
import WalletChangePage from './WalletChange';
interface IProps {
    record: DataTypeCustomer;
    refetch: any;
}
const Description: React.FC<IProps> = ({ record, refetch }) => {
    console.log('🚀 ~ file: Description.tsx ~ line 13 ~ record', record);
    const items = [
        {
            label: 'Thông tin chung',
            key: '1',
            children: <GeneralInformation customerId={record.id} />,
        }, // remember to pass the key prop
        { label: 'Thông tin mua hàng', key: '2', children: <PuchaseHistoryPage /> },
        { label: 'Công nợ', key: '3', children: <DebtPage /> },
        { label: 'Lịch sử tích điểm', key: '4', children: <WalletChangePage /> },
    ];

    return (
        <Card className="gx-mb-0">
            <Tabs items={items} />
        </Card>
    );
};

export default React.memo(Description);
