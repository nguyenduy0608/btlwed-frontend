import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';
import { Row, Table as AntdTable } from 'antd';
import { Button } from 'antd/lib/radio';
import EditOutlined from '@ant-design/icons';
export interface DataTypeNotification {
    id: number;
    code: string;
    fullName: string;
    createdAt: string;
    phoneNumber: string;
    address: string;
    gender: string;
    description: string;
    dateOfBirth: string;
    provinceId: string;
    status: number;
    updatedAt: string;
    totalOrder: number;
    totalProductBought: number;
    province: string;
    turnoverOfOrder: number;
    turnover: number;
    title: string;
    content: string;
}
export const columns = (page: number): ColumnsType<DataTypeNotification> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: '60px',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value, 'dateTime'),
    },
];
