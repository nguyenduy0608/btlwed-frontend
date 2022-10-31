import React, { ReactNode, useState } from 'react';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import voucherService from '../service';
import { Notification } from '@/utils';
import { DataTypeVoucher } from './Voucher.Config';
import { Navigate, useNavigate } from 'react-router-dom';
import { routerPage } from '@/config/routes';
interface IProps {
    record: DataTypeVoucher;
    // handleShowModal: (value: DataTypePotentialCustomers) => void;
    refetch: any;
}
const Buttons = (props: IProps) => {
    const { record, refetch } = props;
    const navigate = useNavigate();
    const handleLock = async (id: number) => {
        const res = await voucherService.lock(id);
        if (res.status) {
            refetch();
        }
    };
    const handleUnlock = async (id: number) => {
        const res = await voucherService.unlock(id);
        if (res.status) {
            refetch();
        }
    };
    const handleDelete = async (id: number) => {
        const res = await voucherService.delete(id);
        if (res.status === 1) {
            Notification('success', 'Xóa thành công');
            refetch();
        }
    };
    return [
        record.status ? (
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
                onClick={() => handleUnlock(record.id)}
            >
                <CloseCircleOutlined />
                Ngừng hoạt động
            </Button>
        ),

        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: 'green',
            }}
            onClick={() => navigate(routerPage.voucherForm + '/' + record.id)}
        >
            <EditOutlined key="edit" />
            Chỉnh sửa
        </Button>,
        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: 'red',
            }}
            onClick={() => handleDelete(record.id)}
        >
            <DeleteOutlined key="delete" />
            Xóa
        </Button>,
    ];
};

export default Buttons;
