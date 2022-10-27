import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';
import { Table as AntdTable } from 'antd';
import { Button } from 'antd/lib/radio';
import EditOutlined from '@ant-design/icons'
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
}
export const columns = (page: number): ColumnsType<DataTypeNotification> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'fullName',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    {
        title : 'Thao tác',
        render: () => (<Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: 'green',
            }}
            onClick={()=>{}}
        >
            <EditOutlined key="edit" />
            Chỉnh sửa
        </Button>)
    },

    AntdTable.SELECTION_COLUMN,
];

