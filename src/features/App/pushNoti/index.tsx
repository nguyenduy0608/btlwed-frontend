import { images } from '@/assets/imagesAssets';
import { routerPage } from '@/config/contants.routes';
import { SET_COUNT_NOTI } from '@/context/types';
import { ORDER_TYPE, VOUCHER_TYPE } from '@/features/Socket/contants';
import useCallContext from '@/hooks/useCallContext';
import { Avatar, Badge, Button, Divider, List, Row, Skeleton } from 'antd';
import moment from 'moment';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { pushNotiService } from './service';
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
    const { dispatch, state } = useCallContext();

    const [notifications, setNotifications] = React.useState<any>([]);
    const navigate = useNavigate();
    const [callback, setCallback] = React.useState(false);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);

    const onClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (page !== 1) {
            setLoading(true);
        }
        pushNotiService
            .get(page)
            .then((res: any) => {
                setNotifications((prev: any) => (page === 1 ? res?.data : [...prev, ...res?.data]));
                setTotal(res?.paging?.totalItemCount);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    React.useEffect(() => {
        setPage(1);
    }, [state.callbackNoti]);

    const [loading, setLoading] = React.useState(false);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setPage((prev) => prev + 1);
    };

    React.useEffect(() => {
        loadMoreData();
    }, []);
    const markAllAsRead = async () => {
        try {
            await pushNotiService.readAll();
            setOpen(false);
        } catch (error) {}
    };

    return (
        <div>
            {/* <Drawer placement="right" closable={false} onClose={onClose} open={open} key="bottom"> */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 className="gx-mb-3 gx-font-weight-bold">Danh sách thông báo</h4>
                {/* <div>Đọc tất cả</div> */}
                <Button
                    type="link"
                    onClick={() => {
                        markAllAsRead();
                    }}
                >
                    Đọc tất cả
                </Button>
            </div>
            {/* <List
                style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}
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
            /> */}
            <div id="scrollableDiv" style={{ height: 'calc(100vh - 400px)', width: '400px', overflowY: 'auto' }}>
                <InfiniteScroll
                    dataLength={notifications.length}
                    next={loadMoreData}
                    hasMore={notifications.length < total}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>Đã tải xong</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={notifications}
                        renderItem={(item: any) => (
                            <ListItemStyled
                                onClick={async () => {
                                    await pushNotiService.read(item?.id);

                                    // nếu là order thì navigate đến order
                                    ORDER_TYPE.includes(item?.dfNotificationId) &&
                                        navigate(routerPage.order + '/' + item?.data?.id);

                                    // nếu là voucher navigate đến voucher
                                    VOUCHER_TYPE.includes(item?.dfNotificationId) &&
                                        navigate(routerPage.voucherForm + '/' + item?.data?.id);

                                    setNotifications((prev: any) => {
                                        return prev.map((notis: any) => {
                                            return item.id === notis.id
                                                ? {
                                                      ...notis,
                                                      isRead: true,
                                                  }
                                                : notis;
                                        });
                                    });

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
                                    title={
                                        <Row justify="space-between" className="gx-m-0">
                                            <div style={{ fontWeight: item?.isRead ? '400' : 'bold' }}>
                                                {item?.title}
                                            </div>
                                            <div
                                                style={{ fontWeight: item?.isRead ? '400' : 'bold', fontSize: '12px' }}
                                            >
                                                {moment(item?.createdAt).format('HH:mm YYYY/MM/DD')}
                                            </div>
                                        </Row>
                                    }
                                    description={
                                        <div style={{ fontWeight: item?.isRead ? '400' : 'bold' }}>{item?.content}</div>
                                    }
                                />
                            </ListItemStyled>
                        )}
                    />
                </InfiniteScroll>
            </div>
            {/* </Drawer> */}
        </div>
    );
};

const ListItemStyled = styled(List.Item)`
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

export default PushNoti;
