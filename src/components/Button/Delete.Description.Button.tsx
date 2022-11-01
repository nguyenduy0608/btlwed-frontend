import { Button, Popconfirm } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';

const DeleteDescriptionButton = ({ handleDelete }: { handleDelete: () => void }) => {
    return (
        <Popconfirm title="Bạn chắc chứ?" onConfirm={handleDelete}>
            <Button
                type="text"
                className="gx-mb-0"
                style={{
                    fontSize: '16px',
                    color: 'red',
                }}
            >
                <IconAntd size="18px" icon="DeleteOutlined" />
                Xóa
            </Button>
        </Popconfirm>
    );
};

export default DeleteDescriptionButton;
