import AppLoading from '@/assets/appLoading.json';
import loadingSync from '@/assets/loading_sync.json';
import { Spin, ConfigProvider, Row } from 'antd';
import Lottie from 'lottie-react';
import React from 'react';
import styled from 'styled-components';
import LocalStorage from './apis/LocalStorage';
import GlobalStyle from './config/global.style';
import { APP_LOADING, SET_INFO, SET_KIOTVIETS, SET_SOCKET } from './context/types';
import { authService } from './features/Auth/service';
import MainPage from './features/MainPage';
import useCallContext from './hooks/useCallContext';
import { appService } from './service';
import moment from 'moment';
import vi_VN from 'antd/lib/locale/vi_VN';
import { BOX_SHADOW } from './config/theme';
import io from 'socket.io-client';

moment.utc().locale('vi');

function App() {
    const { state, dispatch } = useCallContext();
    const [role, setRole] = React.useState('');

    // loading when going to app
    React.useEffect(() => {
        setTimeout(() => {
            dispatch({ type: APP_LOADING, payload: false });
        }, 2500);
    }, []);

    React.useLayoutEffect(() => {
        if (LocalStorage.getToken()) {
            authService.info().then((res) => {
                setRole(Object.keys(res.data)[0]);
                dispatch({
                    type: SET_INFO,
                    payload: { ...res.data[Object.keys(res.data)[0]], role: Object.keys(res.data)[0] },
                });
            });
            appService.getKiotviet().then((res) => {
                dispatch({ type: SET_KIOTVIETS, payload: res.data });
            });
        }
    }, []);

    // setup socket to context
    React.useEffect(() => {
        const socket = io(`https://api.quanlycongviec.cf`, { transports: ['websocket'] });
        if (state.info) {
            dispatch({ type: SET_SOCKET, payload: socket });
        }
        return () => {
            socket.close();
        };
    }, [dispatch, state.info]);

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

            {/* loading khi đồng bộ */}
            {state.syncLoading && (
                <ContainerLoadingSync>
                    <ContainerLoad>
                        <Lottie style={{ height: '300px', width: '300px' }} animationData={loadingSync} loop={true} />
                        <Row justify="center">
                            <strong>Đang đồng bộ ...</strong>
                        </Row>
                    </ContainerLoad>
                </ContainerLoadingSync>
            )}
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
`;

export default App;
