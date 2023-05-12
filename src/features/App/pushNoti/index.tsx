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
const PushNoti = () => {
    <></>;
};

const ListItemStyled = styled(List.Item)`
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

export default PushNoti;
