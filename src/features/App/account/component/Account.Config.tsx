import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { ADMIN } from '@/contants';
import { momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';

export interface DataTypeAccount {
    id: number;
    status?: any;
    name: string;
    address: string;
    phoneNumber?: string;
    phone_number?: string;
    createdDate: string;
    updatedAt: string;
    password?: string;
    department?: string;
    username?: string;

    avatar?: string;
    isRoot?: any;
    kiotvietId?: number;
    accountId?: any;
    group?: any;
    role?: any;
}

export const columns = (page: number): ColumnsType<DataTypeAccount> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Họ tên',
        dataIndex: 'name',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        align: 'center',
    },

    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        render: (value: string) =>
            value === 'active' ? (
                <TagResult text="Đang hoạt động" color="processing" />
            ) : (
                <TagResult text="Ngừng hoạt động" color="error" />
            ),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdDate',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
