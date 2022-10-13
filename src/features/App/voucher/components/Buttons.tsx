import React, { ReactNode, useState } from 'react';
import {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, DatePicker, Descriptions, Input, Segmented, Switch } from 'antd';

const Buttons = () => {
    const [check,setCheck]  = useState(true);
    const handleUpdateStatus = () => {

    }

    return [
        check ? (
            <Button
                type="text"
                className="gx-mb-0"
                style={{
                    fontSize: '16px',
                    color: '#0090FF',
                }}
                onClick={() => {
                    setCheck(!check);
                }}
            >
                <CheckCircleOutlined key="edit" />
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
                onClick={() => {
                    setCheck(!check);
                }}
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
        >
            <DeleteOutlined key="delete" />
            Xóa
        </Button>,
    ];
};

export default Buttons;
