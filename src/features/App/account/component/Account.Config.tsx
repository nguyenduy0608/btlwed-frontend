import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { ColumnsType } from 'antd/lib/table';

export interface DataTypeAccount {
    id: number;
    status?: any;
    fullName: string;
    email: string;
    phoneNumber?: string;
    createdAt: string;
    updatedAt: string;
    password?: string;
    avatar?: string;
    isRoot?: any;
    kiotvietId?: number;
    accountId?: any;
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
        dataIndex: 'fullName',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        align: 'center',
    },
    {
        title: 'Loại tài khoản',
        dataIndex: 'accountId',
        align: 'center',
        render: (value: number) => (value ? 'Admin': 'Admin gian hàng'),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        render: (value: number) =>
            value ? (
                <TagResult text="Đang hoạt động" color="processing" />
            ) : (
                <TagResult text="Ngừng hoạt động" color="error" />
            ),
    },
];
