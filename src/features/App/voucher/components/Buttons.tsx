import React, { ReactNode, useState } from 'react';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Descriptions, Input, Segmented, Switch } from 'antd';
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
const Buttons = ({ record, refetch }: any) => {
    const [check, setCheck] = useState(true);
    const handleUpdateStatus = () => {
        setCheck(!check);
    };
    const navigate = useNavigate();

    return [
        check ? (
            <Button
                type="text"
                className="gx-mb-0"
                style={{
                    fontSize: '16px',
                    color: '#0090FF',
                }}
                onClick={handleUpdateStatus}
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
                onClick={handleUpdateStatus}
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
            onClick={() => navigate(routerPage.voucherForm)}
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
            onClick={async () => {
                const res = await voucherService.delete(record.id);
                if (res.status === 1) {
                    Notification('success', 'Xóa thành công');
                    refetch();
                }
            }}
        >
            <DeleteOutlined key="delete" />
            Xóa
        </Button>,
    ];
};

export default Buttons;
