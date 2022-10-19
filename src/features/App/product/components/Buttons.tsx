import React, { ReactNode, useState } from 'react';
import { EditOutlined,  CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, } from 'antd';
import { CategoryService } from '../page/service';
import { Notification } from '@/utils';
import { DataTypeProductCategory } from './Product.Config';
import { Navigate, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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
        record.status ?(
            <Button
                type="text"
                className="gx-mb-0"
                style={{
                    fontSize: '16px',
                    color: '#0090FF',
                }}
                onClick={() => handleLock(record.id)}
            >
                <CheckCircleOutlined />
                Đang hoạt động
            </Button>
        ) : (
            <Button
                type="text"
                className="gx-mb-0"
                style={{
                    fontSize: '16px',
                    color: '#CC0000',
                }}
                onClick={()=>{handleUnlock(record.id)}}
            >
                <CloseCircleOutlined />
                Ngừng hoạt động
            </Button>
        ),
    ];
};

export default Buttons;
