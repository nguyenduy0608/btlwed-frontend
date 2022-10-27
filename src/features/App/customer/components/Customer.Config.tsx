import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';
import { Table as AntdTable } from 'antd';
export interface DataTypeCustomer {
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
export interface DataTypeDebt {
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
export interface DataTypePurchase {
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
export interface DataTypeWalletChange {
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
export const columns = (page: number): ColumnsType<DataTypeCustomer> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'fullName',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
    },
    {
        title: 'Tỉnh thành phố',
        dataIndex: 'address',
    },
    {
        title: 'Doanh số trên đơn hàng',
        dataIndex: 'turnoverOfOrder',
        align: 'center',
        render: (value: number) => currencyFormat(value),
    },
    {
        title: 'Doanh số thực tế',
        dataIndex: 'turnover',
        align: 'center',
        render: (value: number) => currencyFormat(value),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    AntdTable.SELECTION_COLUMN,
];
export const Purchasecolumns = (page: number): ColumnsType<DataTypePurchase> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Mã đơn',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'user',
        render: (value) => (
            <>
                {value.fullName} {'(' + value.phoneNumber + ')'}
            </>
        ),
    },
    {
        title: 'Số sản phẩm',
        dataIndex: 'quantityProduct',
        align: 'center',
    },
    {
        title: 'Tổng tiền(VNĐ)',
        dataIndex: 'total',
        align: 'center',
        render: (value) => currencyFormat(value),
    },
    {
        title: 'Trạng thái đơn hàng',
        dataIndex: 'status',
        align: 'center',
        render: (value: any) =>
            (value =
                value === 'wait_confirmation'
                    ? 'Đang chờ'
                    : value === 'inprogress'
                    ? 'Đang xử lý'
                    : value === 'completed'
                    ? 'Hoàn thành'
                    : 'Hủy'),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    AntdTable.SELECTION_COLUMN,
];
export const Debtcolumns = (page: number): ColumnsType<DataTypeDebt> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Mã đơn hàng',
        dataIndex: '',
        align: 'center',
    },
    {
        title: 'Giá trị đơn hàng',
        dataIndex: '',
        align: 'center',
    },
    {
        title: 'Công nợ còn lại',
        dataIndex: '',
        align: 'center',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    {
        title: 'Hạn thanh toán',
        dataIndex: '',
        align: 'center',
    },
    {
        title: 'Trạng thái',
        dataIndex: '',
        align: 'center',
    },
];
export const WalletChangecolumns = (page: number): ColumnsType<DataTypeWalletChange> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },

    {
        title: 'Tác vụ',
        dataIndex: '',
        align: 'center',
    },
    {
        title: 'Số điểm',
        dataIndex: '',
        align: 'center',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
