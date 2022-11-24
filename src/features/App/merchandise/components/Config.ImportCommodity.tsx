import { RECORD_SIZE } from '@/config/theme';

export const columnImportCommodity = (page: number): any => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 40,
        render: (row: any, record: any, index: number) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Mã nhập hàng',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: 'Số sản phẩm',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: 'Số lượng',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: 'Người tạo',
        dataIndex: 'code',
        align: 'center',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'code',
        align: 'center',
    },
];
