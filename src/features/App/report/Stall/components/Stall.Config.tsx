import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { Row } from 'antd';

export const stallColumns = (page: number): any => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 40,
        render: (row: any, record: any, index: number) =>
            index > 0 ? page === 1 ? index : (page - 1) * RECORD_SIZE + index : <strong>Tổng</strong>,
    },
    {
        title: 'Tên gian hàng',
        dataIndex: 'name',
    },
    {
        title: 'Số sản phẩm',
        align: 'center',
        dataIndex: 'amountProduct',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value || 0
            ) : (
                <Row className="gx-m-0" justify="center">
                    <TagResult color="#3196C1" text={value || 0} />
                </Row>
            ),
    },
    {
        title: 'SL đã bán',
        dataIndex: 'amountSale',
        align: 'center',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value || 0
            ) : (
                <Row className="gx-m-0" justify="center">
                    <TagResult color="#3196C1" text={value || 0} />
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
                <Row className="gx-m-0" justify="center">
                    <TagResult color="#3196C1" text={value || 0} />
                </Row>
            ),
    },
    {
        title: 'Doanh thu',
        dataIndex: 'orderRevenue',
        align: 'center',
        render: (value: any, row: any, index: number) =>
            index > 0 ? (
                value ? (
                    currencyFormat(value)
                ) : (
                    0
                )
            ) : (
                <Row className="gx-m-0" justify="center">
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
];
