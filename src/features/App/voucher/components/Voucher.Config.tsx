import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { momentToStringDate } from '@/utils';
import  { ColumnsType } from 'antd/lib/table';

export interface DataTypeVoucher {
    id: number;
    status: number;
    code: string;
    name: string;
    quota: number;
    remainQuota: number;
    rewardType: number;
    minSpend: number;
    rewardPercentage: number;
    startTime: string;
    endTime: string;
    enableNotification: number;
    createdAt: string;
    updatedAt: string;
    rewardCap:number;
}

export const columns = (page: number): ColumnsType<DataTypeVoucher> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Mã voucher',
        dataIndex: 'code',
    },
    {
        title: 'Tên voucher',
        dataIndex: 'name',
    },
    {
        title: 'Số lượng quy định',
        dataIndex: 'remainQuota',
        align: 'center',
    },
    {
        title: 'Số lượng còn lại',
        dataIndex: 'rewardType',
        align: 'center',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startTime',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endTime',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
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
