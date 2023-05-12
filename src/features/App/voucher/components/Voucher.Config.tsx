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

export const columns = (page: number): ColumnsType<any> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },

    {
        title: 'Tên phòng ban',
        dataIndex: 'name',
    },
    {
        title: 'Admin quản lý',
        dataIndex: 'admin',
        align: 'center',
        render: (value: any) => value?.name,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        render: (value: number) => (
            // value ? (
            <TagResult text="Đang hoạt động" color="processing" />
        ),
        // ) : (
        //     <TagResult text="Ngừng hoạt động" color="error" />
        // ),
    },
];
