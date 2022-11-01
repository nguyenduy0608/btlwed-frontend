import React, { ReactNode, useState } from 'react';
import {
    EditOutlined,
    DeleteOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    ReloadOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import voucherService from '../service';
import { Notification } from '@/utils';
import { DataTypeAccount } from './Account.Config';
import { useNavigate } from 'react-router-dom';
import ActiveButton from '@/components/Button/Active.Button';
import UnActiveButton from '@/components/Button/UnActive.Button';
interface IProps {
    record: DataTypeAccount;
    handleShowModal?: any;
    refetch: any;
}
const Buttons = (props: IProps) => {
    const { record, refetch, handleShowModal } = props;
    const navigate = useNavigate();

    const { confirm } = Modal;
    const destroyAll = () => {
        Modal.destroyAll();
    };
    const showConfirmDelete = () => {
        setTimeout(() => {
            confirm({
                title: 'Xóa tài khoản',
                icon: <ExclamationCircleOutlined />,
                content: (
                    <Button className="gx-mb-0" onClick={destroyAll}>
                        Bạn chắc chắn muốn xóa tài khoản này?
                    </Button>
                ),
                onOk() {
                    handleDelete(record.id);
                },
                onCancel() {},
            });
        });
    };
    const showConfirmReset = () => {
        setTimeout(() => {
            confirm({
                width: '520px',
                title: 'Đặt lại mật khẩu',
                icon: <ExclamationCircleOutlined />,
                content: (
                    <Button className="gx-mb-0" onClick={destroyAll}>
                        Bạn chắc chắn đồng ý đặt lại mật khẩu khách hàng?
                    </Button>
                ),
                onOk() {
                    handleReset(record.id);
                },
                onCancel() {},
            });
        });
    };
    const handleReset = async (id: number) => {
        const res = await voucherService.resetPassword(id);
        if (res.status) {
            Notification('success', 'Reset mật khẩu thành công');
            refetch();
        }
    };
    const handleLock = async (id: number) => {
        const res = await voucherService.lock(id);
        if (res.status) {
            Notification('success', 'Thay đổi trạng thái thành công');
            refetch();
        }
    };
    const handleUnlock = async (id: number) => {
        const res = await voucherService.unlock(id);
        if (res.status) {
            Notification('success', 'Thay đổi trạng thái thành công');
            refetch();
        }
    };
    const handleDelete = async (id: number) => {
        const res = await voucherService.delete(id);
        if (res.status) {
            Notification('success', 'Xóa thành công');
            refetch();
        }
    };
    return [
        record.status ? (
            <UnActiveButton
                onClick={() => {
                    handleLock(record.id);
                }}
            />
        ) : (
            <ActiveButton onClick={() => handleUnlock(record.id)} />
        ),

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
        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: '#000',
            }}
            onClick={showConfirmReset}
        >
            <ReloadOutlined key="reset" />
            Reset mật khẩu
        </Button>,

        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: 'red',
            }}
            onClick={showConfirmDelete}
        >
            <DeleteOutlined key="delete" />
            Xóa
        </Button>,
    ];
};

export default Buttons;
