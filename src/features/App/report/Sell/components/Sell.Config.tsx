import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { Row } from 'antd';
import SellPrint from './Sell.Print';

export const sellColumns = (page: number): any => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 40,
        render: (row: any, record: any, index: number) =>
            index > 0 ? page === 1 ? index : (page - 1) * RECORD_SIZE + index : <strong>Tổng</strong>,
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value
            ) : (
                <Row justify="center">
                    <TagResult color="#3196C1" text={row?.totalProduct || 0} />
                </Row>
            ),
    },
    {
        title: 'Danh mục',
        dataIndex: 'groupProduct',
        render: (value: any, row: any, index: number) => index > 0 && value,
    },
    {
        title: 'SL đã bán',
        dataIndex: 'amountSale',
        align: 'center',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value || 0
            ) : (
                <Row justify="center">
                    <TagResult color="#3196C1" text={row?.amountSale} />
                </Row>
            ),
    },
    {
        title: 'SL đơn hàng',
        dataIndex: 'amountOrder',
        align: 'center',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value || 0
            ) : (
                <Row justify="center">
                    <TagResult color="#3196C1" text={value || 0} />
                </Row>
            ),
    },
    {
        title: 'Doanh thu',
        dataIndex: 'turnover',
        align: 'center',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value ? (
                    currencyFormat(value)
                ) : (
                    0
                )
            ) : (
                <Row justify="center">
                    <TagResult color="#3196C1" text={currencyFormat(value || 0)} />
                </Row>
            ),
    },
    {
        title: 'Doanh thu thực tế',
        dataIndex: 'actualRevenue',
        align: 'center',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value ? (
                    currencyFormat(value)
                ) : (
                    0
                )
            ) : (
                <Row justify="center">
                    <TagResult color="#3196C1" text={currencyFormat(value || 0)} />
                </Row>
            ),
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
