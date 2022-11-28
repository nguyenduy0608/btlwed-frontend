import React from 'react';
import { Drawer, Avatar, List } from 'antd';
const data = [
    {
        title: 'Thông báo 1',
    },
    {
        title: 'Thông báo 2',
    },
    {
        title: 'Thông báo 3',
    },
    {
        title: 'Thông báo 4',
    },
];
const PushNoti = ({ open, setOpen }: any) => {
    const onClose = () => {
        setOpen(false);
    };

    return (
        <Drawer placement="right" closable={false} onClose={onClose} open={open} key="bottom">
            <h4 className="gx-mb-3 gx-font-weight-bold">Danh sách thông báo</h4>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </Drawer>
    );
};

export default PushNoti;
