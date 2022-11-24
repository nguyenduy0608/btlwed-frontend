import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';

export const stallColumns = (page: number): any => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 40,
        render: (row: any, record: any, index: number) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên gian hàng',
        dataIndex: 'name',
    },
    {
        title: 'Số sản phẩm',
        align: 'center',
        dataIndex: 'amountProduct',
    },
    {
        title: 'SL đã bán',
        dataIndex: 'amountSale',
        align: 'center',
        render: (value: any) => value || 0,
    },
    {
        title: 'SL đơn hàng',
        dataIndex: 'amountOrder',
        align: 'center',
        render: (value: any) => value || 0,
    },
    {
        title: 'Doanh thu',
        dataIndex: 'orderRevenue',
        align: 'center',
        render: (value: any) => (value ? currencyFormat(value) : 0),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
