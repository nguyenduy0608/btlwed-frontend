import { RECORD_SIZE } from '@/config/theme';
import { momentToStringDate } from '@/utils';

export const sellColumns = (page: number): any => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 40,
        render: (row: any, record: any, index: number) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
    },
    {
        title: 'Nhóm sản phẩm',
        dataIndex: 'groupProduct',
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
        dataIndex: 'turnover',
        render: (value: any) => value || 0,
    },
    {
        title: 'Doanh thu thực tế',
        dataIndex: 'actualRevenue',
        render: (value: any) => value || 0,
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
