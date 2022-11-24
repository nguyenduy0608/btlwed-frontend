import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import SellPrint from './Sell.Print';

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
        dataIndex: 'turnover',
        align: 'center',
        render: (value: any) => (value ? currencyFormat(value) : 0),
    },
    {
        title: 'Doanh thu thực tế',
        dataIndex: 'actualRevenue',
        align: 'center',
        render: (value: any) => (value ? currencyFormat(value) : 0),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    // {
    //     title: 'In',
    //     dataIndex: 'action',
    //     align: 'center',
    //     render: (value: any, row: any) => <SellPrint row={row} />,
    // },
];
