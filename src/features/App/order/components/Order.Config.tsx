import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';
import { Table as AntdTable } from 'antd';
import { ORDERSTATUS } from '@/contants';
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
            (value =
                value === ORDERSTATUS.wait_confirmation
                    ? 'Chờ xác nhận'
                    : value === ORDERSTATUS.inprogress
                    ? 'Đang xử lý'
                    : value === ORDERSTATUS.completed
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
        render : (value) => currencyFormat(value)
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        align: 'center',
    },
    {
        title: 'Thành tiền',
        dataIndex: '',
        align: 'center',
          
    },

    AntdTable.SELECTION_COLUMN,
];