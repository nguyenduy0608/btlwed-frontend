import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { momentToStringDate } from '@/utils';
import { Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { NEWS_STATUS, NEWS_TYPE } from '../service';

export const columns = (page: number): ColumnsType<any> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 10,
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
    },
    {
        title: 'Loại tin tức',
        dataIndex: 'type',
        align: 'center',
        render: (value: number) =>
            value === NEWS_TYPE.BANNER ? (
                <TagResult text="Banner" color="processing" />
            ) : value === NEWS_TYPE.POLICY ? (
                <TagResult text="Chính sách" color="error" />
            ) : (
                <TagResult text="Hướng dẫn" color="warning" />
            ),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        align: 'center',
        render: (value: number) =>
            value === NEWS_STATUS.POST ? (
                <TagResult text="Đăng bài" color="processing" />
            ) : (
                <TagResult text="Lưu nháp" color="warning" />
            ),
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        align: 'center',
        render: (value: any) => momentToStringDate(value),
    },
];
