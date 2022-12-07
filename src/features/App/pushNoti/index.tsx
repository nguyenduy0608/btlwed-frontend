import React from 'react';
import { Drawer, Avatar, List, Badge } from 'antd';
import { pushNotiService } from './service';
import { images } from '@/assets/imagesAssets';
import { useNavigate } from 'react-router-dom';
import { routerPage } from '@/config/contants.routes';
import styled from 'styled-components';
import useCallContext from '@/hooks/useCallContext';
import { SET_COUNT_NOTI } from '@/context/types';
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
    const { dispatch } = useCallContext();

    const [notifications, setNotifications] = React.useState<any>([]);
    const navigate = useNavigate();
    const [callback, setCallback] = React.useState(false);

    const onClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        pushNotiService.get().then((res) => {
            setNotifications(res.data);
        });
    }, [callback]);

    return (
        <Drawer placement="right" closable={false} onClose={onClose} open={open} key="bottom">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 className="gx-mb-3 gx-font-weight-bold">Danh sách thông báo</h4>
                {/* <div>Đọc tất cả</div> */}
            </div>
            <List
                style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item: any) => (
                    <ListItemStyled
                        onClick={() => {
                            pushNotiService.read(item?.id);
                            navigate(routerPage.order + '/' + item?.data?.id);
                            setCallback(!callback);
                            dispatch({
                                type: SET_COUNT_NOTI,
                            });
                            setOpen(false);
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                item?.isRead ? (
                                    <Avatar src={images.notification} />
                                ) : (
                                    <Badge dot color="blue">
                                        <Avatar src={images.notification} />
                                    </Badge>
                                )
                            }
                            title={<div style={{ fontWeight: item?.isRead ? '400' : 'bold' }}>{item?.title}</div>}
                            description={
                                <div style={{ fontWeight: item?.isRead ? '400' : 'bold' }}>{item?.content}</div>
                            }
                        />
                    </ListItemStyled>
                )}
            />
        </Drawer>
    );
};

const ListItemStyled = styled(List.Item)`
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

export default PushNoti;
