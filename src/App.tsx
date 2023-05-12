import AppLoading from '@/assets/appLoading.json';
import { Button, ConfigProvider, notification, Row, Spin, Timeline } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN';
import Lottie from 'lottie-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import LocalStorage from './apis/LocalStorage';
import GlobalStyle from './config/global.style';
import { BOX_SHADOW } from './config/theme';
import { APP_LOADING, SET_BG_APP, SET_COUNT_NOTI, SET_INFO, SET_KIOTVIETS, SET_SOCKET } from './context/types';
import MainPage from './features/MainPage';
import useCallContext from './hooks/useCallContext';
import { appService } from './service';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

moment.utc().locale('vi');

function App() {
    const { state, dispatch } = useCallContext();
    const [role, setRole] = React.useState('');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LocalStorage.getToken()}`,
    };
    const location = useLocation();

    // loading when going to app
    React.useEffect(() => {
        setTimeout(() => {
            dispatch({ type: APP_LOADING, payload: false });
        }, 2500);
    }, []);

    React.useLayoutEffect(() => {
        if (LocalStorage.getToken()) {
            axios.get('http://26.75.181.165:8080/getrole', { headers }).then((res) => {
                setRole(res.data.role);
                dispatch({
                    type: SET_INFO,
                    payload: { ...res.data[Object.keys(res.data)[0]], role: res.data.role },
                });
            });
        }
    }, []);

    return (
        <SpinLoadingStyled
            spinning={state.appLoading}
            indicator={
                <ContainerLoading>
                    <div style={{ height: '600px', width: '600px' }}>
                        <Lottie animationData={AppLoading} loop={true} />
                    </div>
                </ContainerLoading>
            }
        >
            <ConfigProvider locale={vi_VN}>
                <MainPage role={role} />
            </ConfigProvider>
            {/* define default style */}
            <GlobalStyle />
        </SpinLoadingStyled>
    );
}

const SpinLoadingStyled = styled(Spin)`
    &&& {
        top: 0;
        left: 0;
    }
`;

const ContainerLoading = styled.div`
    top: 0 !important;
    margin: 0 !important;
    left: 0 !important;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const ContainerLoadingSync = styled.div`
    top: 0 !important;
    margin: 0 !important;
    left: 0 !important;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
`;

const ContainerLoad = styled.div`
    background-color: white;
    border-radius: 20px;
    box-shadow: ${BOX_SHADOW};
    padding: 40px;
    max-width: 500px;
`;

export default App;
