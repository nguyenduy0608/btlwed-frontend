import React from 'react';
import { Drawer } from 'antd';

const PushNoti = ({ open, setOpen }: any) => {
    const onClose = () => {
        setOpen(false);
    };

    return (
        <Drawer placement="right" closable={false} onClose={onClose} open={open} key="bottom">
            <p>Danh sách thông báo</p>
        </Drawer>
    );
};

export default PushNoti;
