import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';

export interface DataTypeProductCategory {
    id: number;
    code: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    descreption: string;
    kiotvietId: number;
    kiotvietProductCategoryId: number;
    order: number;
    parentId: any;
    status: number;
    total_child: number;
    deletedAt: any;
}
export interface DataTypeProduct {
    id: number;
    code: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    descreption: string;
    kiotvietId: number;
    kiotvietProductCategoryId: number;
    maxStock: number;
    minStock: number;
    price: number;
    sellingPrice: number;
    sold: number;
    stock: number;
    category: object;
    status: number;
    total_child: number;
    deletedAt: any;
}
export const dataSourceOderList = [
    {
        id: '1',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duy',
        amount: 30,
        total: 2000000,
    },
    {
        id: '2',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duyyyyy',
        amount: 30,
        total: 2000000,
    },
    {
        id: '3',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duyyyyy',
        amount: 30,
        total: 2000000,
    },
];
export const dataSourceProduct = [
    {
        id: '1',
        productId: 'Pj1000',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
    {
        id: '2',
        productId: 'Pj1001',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
    {
        id: '3',
        productId: 'Pj1000',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
    {
        id: '4',
        productId: 'Pj1000',
        name: 'Đinh vít',
        category: 'Con lăn sơn',
        price: 100000,
        status: 'Hoạt động',
        total: 2000,
    },
];
export const columns = (page: number): ColumnsType<DataTypeProductCategory> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        render: (value: number) =>
            value ? (
                <TagResult text="Đang hoạt động" color="processing" />
            ) : (
                <TagResult text="Ngừng hoạt động" color="error" />
            ),
    },
    {
        title: 'Thứ tự hiển thị',
        dataIndex: 'order',
        align: 'center',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
export const columnsProduct = (page: number): ColumnsType<DataTypeProduct> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Mã sản phẩm',
        dataIndex: 'code',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        align: 'center',
        render: (value) => value?.name,
    },
    {
        title: 'Giá bán(VNĐ)',
        dataIndex: 'sellingPrice',
        align: 'center',
        render: (value: number) => currencyFormat(value),
    },

    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (value: number) =>
            value ? (
                <TagResult text="Đang hoạt động" color="processing" />
            ) : (
                <TagResult text="Ngừng hoạt động" color="error" />
            ),
    },

    {
        title: 'Tổng tồn',
        dataIndex: 'stock',
        align: 'center',
        render: (value: number) => value,
    },
];

export const columsOderList = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Mã đơn',
        dataIndex: 'oderId',
        key: 'Id',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'total',
        key: 'total',
    },
];
