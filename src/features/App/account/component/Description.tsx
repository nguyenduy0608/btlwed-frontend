import React from 'react';
import {  Card, Descriptions } from 'antd';
import Buttons from './Buttons';
import { DataTypeAccount } from './Account.Config';
import { momentToStringDate } from '@/utils';
interface IProps {
    record: DataTypeAccount;
    refetch: any;
    handleShowModal?: (record: DataTypeAccount) => void;
}
const Description: React.FC<IProps> = ({ record, refetch ,handleShowModal}) => {
    return (
        <Card className="gx-mb-0" actions={Buttons({ record, handleShowModal, refetch })}>
            <Descriptions title="Thông tin mã giảm giá" column={2}>
                <Descriptions.Item label="Tên người dùng">{record.fullName || '--'}</Descriptions.Item>
                <Descriptions.Item label="Email">{record.email || '--'}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{record.phoneNumber || '--'}</Descriptions.Item>
                <Descriptions.Item label="Ngàytạo">{momentToStringDate(record.createdAt) || '--'}</Descriptions.Item>
                <Descriptions.Item label="Vai trò">
                    {record.kiotvietId ? (
                        <p> Admin</p>
                    ) : (
                        <p>Admin gian hàng</p>
                    )}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default React.memo(Description);
