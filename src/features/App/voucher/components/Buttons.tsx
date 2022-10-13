import React, { ReactNode } from 'react';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Descriptions, Input, Segmented, Switch } from 'antd';

const Buttons = () => {
    return [
        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: '#0090FF',
            }}
        >
            <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Dừng hoạt động" />
        </Button>,
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
