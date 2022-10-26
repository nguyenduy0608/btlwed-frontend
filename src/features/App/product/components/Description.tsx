import React from 'react';
import {  Card, Descriptions, Tag } from 'antd';
import Buttons from './Buttons';
import { DataTypeProductCategory } from './Product.Config';
import { momentToStringDate } from '@/utils';
import TagResult from '@/components/TagResult';
interface IProps {
    record: DataTypeProductCategory;
    handleShowModal?: (record: DataTypeProductCategory) => void;
    refetch: any;
}
const Description: React.FC<IProps> = ({ record, handleShowModal, refetch }) => {
    return (
        <Card className="gx-mb-0" actions={Buttons({ record, handleShowModal, refetch })}>
            <Descriptions title="Thông tin danh mục" column={2}>
                <Descriptions.Item label="Tên danh mục">{record.name || '--'}</Descriptions.Item>
                <Descriptions.Item label="Thứ tự hiển thị">{record.order || '--'}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                    {record.status ? (
                        <TagResult text="Đang hoạt động" color="processing" />
                    ) : (
                        <TagResult text="Ngừng hoạt động" color="error" />
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">{momentToStringDate(record.createdAt) || '--'}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default React.memo(Description);
