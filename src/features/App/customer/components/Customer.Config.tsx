import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';
import { Table as AntdTable } from 'antd';
import { ORDER_STATUS } from '@/contants';
import TagResult from '@/components/TagResult';
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
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'DS trên đơn hàng',
        dataIndex: 'turnoverOfOrder',
        align: 'center',
        render: (value: number) => currencyFormat(value || 0),
    },
    {
        title: 'DS thực tế',
        dataIndex: 'turnover',
        align: 'center',
        render: (value: number) => currencyFormat(value || 0),
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
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
export const Purchasecolumns = (page: number): ColumnsType<DataTypePurchase> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * 8 + ++index),
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
            value === ORDER_STATUS.WAIT_CONFIRMATION ? (
                <TagResult text="Chờ xác nhận" color="orange" />
            ) : value === ORDER_STATUS.INPROGRESS ? (
                <TagResult text="Đang xử lý" color="processing" />
            ) : value === ORDER_STATUS.COMPLETED ? (
                <TagResult text="Hoàn thành" color="success" />
            ) : (
                <TagResult text="Hủy" color="error" />
            ),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
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
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * 8 + ++index),
    },
    {
        title: 'Mã đơn hàng',
        dataIndex: '',
        align: 'center',
    },
    {
        title: 'Tác vụ',
        dataIndex: 'note',
        align: 'center',
    },
    {
        title: 'Số điểm',
        dataIndex: 'value',
        align: 'center',
        render: (value: number) => currencyFormat(value || 0),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
