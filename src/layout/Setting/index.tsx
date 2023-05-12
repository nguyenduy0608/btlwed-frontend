import LocalStorage from '@/apis/LocalStorage';
import sync from '@/assets/sync.json';
import IconAntd from '@/components/IconAntd';
import { DefaultSelectStyled } from '@/config/global.style';
import { SET_BG_APP, SET_BG_APP_COLOR, SET_BG_APP_FLOWER, SET_SYNC_LOADING } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import { wait } from '@/utils';
import { Button, Checkbox, Col, Drawer, Popover, Row, Select, Switch } from 'antd';
import Lottie from 'lottie-react';
import React from 'react';
import { CirclePicker } from 'react-color';
import { useLocation, useNavigate } from 'react-router-dom';
import { syncService } from './service';

const Setting = () => {
    <></>;
};

export default Setting;
