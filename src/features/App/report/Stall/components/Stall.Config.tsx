import { RECORD_SIZE } from '@/config/theme';
import { momentToStringDate } from '@/utils';

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
        dataIndex: 'amountProduct',
    },
    {
        title: 'SL đã bán',
        dataIndex: 'amountSale',
        render: (value: any) => value || 0,
    },
    {
        title: 'SL đơn hàng',
        dataIndex: 'amountOrder',
        render: (value: any) => value || 0,
    },
    {
        title: 'Doanh thu',
        dataIndex: 'orderRevenue',
        render: (value: any) => value || 0,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
