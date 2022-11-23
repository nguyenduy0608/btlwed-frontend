import IconAntd from '@/components/IconAntd';
import TagResult from '@/components/TagResult';
import TreeView from '@/components/TreeView';
import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat, momentToStringDate, uuid } from '@/utils';
import { Tree } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';

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
    rewardCap: number;
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
        title: 'SL quy định',
        dataIndex: 'quota',
        align: 'center',
    },
    {
        title: 'SL còn lại',
        dataIndex: 'remainQuota',
        align: 'center',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startTime',
        align: 'center',
        render: (value: any) => momentToStringDate(value, 'dateTime'),
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endTime',
        align: 'center',
        render: (value: any) => momentToStringDate(value, 'dateTime'),
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

const ButtonDeleteStyled = styled.div`
    color: red;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
        scale: 1.4;
    }
`;

export const columnsApplyVoucherSelect: any = (callbackRemoveProduct: any) => [
    {
        title: '',
        dataIndex: 'id',
        align: 'center',
        width: '60px',
        render: (id: number) => (
            <ButtonDeleteStyled onClick={() => callbackRemoveProduct(id)}>
                <IconAntd icon="MinusSquareOutlined" />
            </ButtonDeleteStyled>
        ),
    },
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: '50px',
        render: (_: any, a: any, index: number) => ++index,
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
        render: (value: any) =>
            value?.categoryParent ? (
                <TreeView parent={value?.categoryParent?.name} children={value?.name} />
            ) : (
                value?.name
            ),
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: 'auto',
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        key: 'price',
        width: '140px',
        render: (value: number) => currencyFormat(value),
        sorter: (a: any, b: any) => a.price - b.price,
    },
];

export const columnsApplyVoucher: any = (page: number) => [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: '50px',
        render: (_: any, a: any, index: number) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
        render: (value: any) => value?.name,
        width: '300px',
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: 'auto',
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        key: 'price',
        width: '140px',
        render: (value: number) => currencyFormat(value),
        sorter: (a: any, b: any) => a.price - b.price,
    },
];
