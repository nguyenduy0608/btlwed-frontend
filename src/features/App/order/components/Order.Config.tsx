import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { ORDER_STATUS } from '@/contants';
import { currencyFormat, momentToStringDate } from '@/utils';
import { Table as AntdTable } from 'antd';
import { ColumnsType } from 'antd/lib/table';
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
    shippingAddress: any;
    shippingDistrictId: number;
    shippingName: string;
    shippingPhoneNumber: string;
    shippingProvinceId: number;
    shippingWardId: number;
    total: number;
    items: any;
    totalDiscount: number;
    totalPayment: number;
    transportStatus: any;
    transportStatusCode: number;
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
        title: 'Trạng thái thanh toán',
        dataIndex: 'paymentStatus',
        align: 'center',
        render: (value) =>
            value ? (
                <TagResult text="Đang chờ" color="processing" />
            ) : (
                <TagResult text="Đã thanh toán" color="success" />
            ),
    },
    {
        title: 'Nguồn đơn',
        dataIndex: 'createtableType',
        align: 'center',
        render: (value) => (value ? 'KiotViet' : 'Staka'),
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
        dataIndex: 'productName',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        align: 'center',
    },
    {
        title: 'Đơn vị tính',
        dataIndex: 'productUnit',
        align: 'center',
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        align: 'center',
        render: (value) => currencyFormat(value),
    },
    {
        title: 'Thành tiền',
        dataIndex: '',
        align: 'center',
        render: (value, row: any) => currencyFormat(row?.price * row?.quantity),
    },
];
