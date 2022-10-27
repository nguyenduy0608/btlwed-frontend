import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';
import { Table as AntdTable } from 'antd';
export interface DataTypeOrder {
    id: number;
    code: string;
    createdAt: string;
    status: number;
    updatedAt: string;
    giftStatus: number;
    kiotviet: any;
    kiotvietId: number;
    kiotvietOrderId: number;
    paymentMethod: string;
    paymentStatus: string;
    quantityProduct: number;
    dateOfBirth: string;
    shipping_address: '123, Phường Hội Hợp, Thành phố Vĩnh Yên, Vĩnh Phúc';
    shipping_district_id: number;
    shippingName: string;
    shippingPhoneNumber: string;
    shippingProvinceId: number;
    shippingWardId: number;
    total: number;
    totalDiscount: number;
    totalPayment: number;
    transportStatus: any;
    transportStatus_code: number;
    updatableId: any;
}
export const columns = (page: number): ColumnsType<DataTypeOrder> => [
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
        title: 'Trạng thái thanh toán',
        dataIndex: 'paymentStatus',
        align: 'center',
        render: (value) => (value ? 'Đang chờ' : 'Đã thanh toán'),
    },
    {
        title: 'Nguồn đơn',
        dataIndex: 'createtableType',
        align: 'center',
        render: (value: number) => (value ? 'KiotViet' : 'Staka'),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    AntdTable.SELECTION_COLUMN,
];
export const columnsProduct = (page: number): ColumnsType<DataTypeOrder> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        align: 'center',
    },
    {
        title: 'Số lượng',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: 'Đơn vị tính',
        dataIndex: 'code',
        align: 'center',
        render : (value) => currencyFormat(value)
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        align: 'center',
    },
    {
        title: 'Thành tiền',
        dataIndex: 'code',
        align: 'center',
    },

    AntdTable.SELECTION_COLUMN,
];