import React from 'react';
import { Card, Descriptions } from 'antd';
import Buttons from './Buttons';
import { DataTypeVoucher } from './Voucher.Config';
import { momentToStringDate } from '@/utils';
interface IProps {
    record: DataTypeVoucher;
    refetch: any;
}
const Description: React.FC<IProps> = ({ record, refetch }) => {
    return (
        <Card className="gx-mb-0" actions={Buttons({ record, refetch })}>
            <Descriptions title="Thông tin mã giảm giá" column={2}>
                <Descriptions.Item label="Mã voucher">{record.code || '--'}</Descriptions.Item>
                <Descriptions.Item label="Ngày bắt đầu">
                    {momentToStringDate(record.startTime, 'dateTime') || '--'}
                </Descriptions.Item>
                <Descriptions.Item label="Tên voucher">{record.name || '--'}</Descriptions.Item>
                <Descriptions.Item label="Ngày kết thúc">
                    {momentToStringDate(record.endTime, 'dateTime') || '--'}
                </Descriptions.Item>
                <Descriptions.Item label="Số lượng quy định">{record.quota || '--'}</Descriptions.Item>
                <Descriptions.Item label="Số lượng còn lại">{record.remainQuota || '--'}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default React.memo(Description);
