import React, { ReactNode, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CategoryService } from '../service';
import { DataTypeProductCategory } from './Product.Config';
import ActiveButton from '@/components/Button/Active.Button';
import UnActiveButton from '@/components/Button/UnActive.Button';
interface IProps {
    record: DataTypeProductCategory;
    handleShowModal?: any;
    refetch?: any;
}
const Buttons = (props: IProps) => {
    const { record, handleShowModal, refetch } = props;
    const handleLock = async (id: number) => {
        const res = await CategoryService.lock(id);
        if (res.status) {
            refetch();
        }
    };
    const handleUnlock = async (id: number) => {
        const res = await CategoryService.unlock(id);
        if (res.status) {
            refetch();
        }
    };
    return [
        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: 'green',
            }}
            onClick={handleShowModal}
        >
            <EditOutlined key="edit" />
            Chỉnh sửa
        </Button>,
        record.status ? (
            <UnActiveButton
                onClick={() => {
                    handleLock(record.id);
                }}
            />
        ) : (
            <ActiveButton onClick={() => handleUnlock(record.id)} />
        ),
    ];
};

export default Buttons;
