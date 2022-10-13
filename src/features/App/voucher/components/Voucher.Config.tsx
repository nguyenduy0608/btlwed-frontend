import TagResult from '@/components/TagResult';
import { Tag } from 'antd';

export const dataSourceVoucher = [
    {
        id: '1',
        voucherId: 'KM0011',
        name: 'Mua 10 tặng 1',
        amount: 10,
        remainingAmount: 5,
        createAt: '19/08/2020',
        endAt: '20/09/2021',
        status: 0,
    },
    {
        id: '2',
        voucherId: 'KM0011',
        name: 'Mua 10 tặng 1',
        amount: 10,
        remainingAmount: 5,
        createAt: '19/08/2020',
        endAt: '20/09/2021',
        status: 0,
    },
    {
        id: '3',
        voucherId: 'KM0011',
        name: 'Mua 10 tặng 1',
        amount: 10,
        remainingAmount: 5,
        createAt: '19/08/2020',
        endAt: '20/09/2021',
        status: 1,
    },
    {
        id: '4',
        voucherId: 'KM0011',
        name: 'Mua 10 tặng 1',
        amount: 10,
        remainingAmount: 5,
        createAt: '19/08/2020',
        endAt: '20/09/2021',
        status: 1,
    },
    {
        id: '5',
        voucherId: 'KM0011',
        name: 'Mua 10 tặng 1',
        amount: 10,
        remainingAmount: 5,
        createAt: '19/08/2020',
        endAt: '20/09/2021',
        status: 1,
    },
];
export const columnsVoucher = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Mã voucher',
        dataIndex: 'voucherId',
        key: 'voucherId',
    },
    {
        title: 'Tên voucher',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Số lượng quy định',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Số lượng còn lại',
        dataIndex: 'remainingAmount',
        key: 'remainingAmount',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'createAt',
        key: 'createAt',
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endAt',
        key: 'id',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (value: number) =>
            value ? (
                <TagResult text="Đang hoạt động" color="processing" />
            ) : (
                <TagResult text="Dừng hoạt động" color="error" />
            ),
    },
];
export const dataSourceApplyVoucher = [
    {
        id: '1',
        category: 'Trà',
        product: 'Trà nhài',
        price: '15000000',
    },
    {
        id: '2',
        category: 'Bánh quy',
        product: 'Bánh quy',
        price: '12000000',
    },
    {
        id: '3',
        category: 'Bánh kem',
        product: 'Bánh kem',
        price: '17000000',
    },
];
export const columnsApplyVoucher = [
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
        filters: [
            {
                text: 'Trà',
                value: 'Trà',
            },
            {
                text: 'Bánh quy',
                value: 'Bánh quy',
            },
            {
                text: 'Bánh kem',
                value: 'Bánh kem',
            },
        ],
        filterSearch: true,
        onFilter: (value: any, record: any) => record.category.includes(value),
        width: '35%',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
        key: 'product',
        filters: [
            {
                text: 'Trà nhài',
                value: 'Trà nhài',
                type: 'radio',
            },
            {
                text: 'Bánh quy',
                value: 'Bánh quy',
            },
            {
                text: 'Bánh kem',
                value: 'Bánh kem',
            },
        ],
        filterSearch: true,
        onFilter: (value: any, record: any) => record.product.includes(value),
        width: '35%',
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        key: 'price',
        sorter: (a: any, b: any) => a.price - b.price,
    },
];
