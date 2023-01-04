import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { ADMIN } from '@/contants';
import { ColumnsType } from 'antd/lib/table';

export interface DataTypeAccount {
    id: number;
    status?: any;
    fullName: string;
    email: string;
    phoneNumber?: string;
    phone_number?: string;
    createdAt: string;
    updatedAt: string;
    password?: string;
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
        dataIndex: 'group',
        align: 'center',
        render: (value: any) => {
            switch (value) {
                case ADMIN.main:
                    return 'Admin';
                case ADMIN.stall:
                    return 'Admin gian hàng';
                case ADMIN.news:
                    return 'Admin tin tức';
                case ADMIN.accountant:
                    return 'Admin kế toán';
                default:
                    return '';
            }
        },
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
