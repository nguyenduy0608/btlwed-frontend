import { Button, Popconfirm } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';

const DeleteButton = ({ onConfirm }: { onConfirm: () => void }) => {
    return (
        <Popconfirm title="Bạn chắc chắn muốn xoá??" onConfirm={onConfirm}>
            <Button
                icon={<IconAntd size="16px" icon="DeleteOutlined" />}
                key="delete"
                danger
                className="gx-mb-0"
                type="dashed"
            >
                Xóa
            </Button>
        </Popconfirm>
    );
};

export default DeleteButton;
