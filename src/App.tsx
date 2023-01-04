import AppLoading from '@/assets/appLoading.json';
import loadingSync from '@/assets/loading_sync.json';
import { Button, ConfigProvider, notification, Row, Spin, Timeline } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN';
import Lottie from 'lottie-react';
import moment from 'moment';
import React from 'react';
import Snowfall from 'react-snowfall';
import io from 'socket.io-client';
import styled from 'styled-components';
import LocalStorage from './apis/LocalStorage';
import IconAntd from './components/IconAntd';
import TagResult from './components/TagResult';
import GlobalStyle from './config/global.style';
import { BOX_SHADOW } from './config/theme';
import { APP_LOADING, SET_BG_APP, SET_COUNT_NOTI, SET_INFO, SET_KIOTVIETS, SET_SOCKET } from './context/types';
import { authService } from './features/Auth/service';
import MainPage from './features/MainPage';
import useCallContext from './hooks/useCallContext';
import { appService } from './service';
const DEV_TYPE = import.meta.env.VITE_DEVOPS_TYPE;

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
                setRole(res.data[Object.keys(res.data)[0]]?.group);
                dispatch({
                    type: SET_INFO,
                    payload: { ...res.data[Object.keys(res.data)[0]], role: Object.keys(res.data)[0] },
                });
            });
        }

        if (LocalStorage.getBG()) {
            dispatch({
                type: SET_BG_APP,
                payload: JSON.parse(LocalStorage.getBG() as any),
            });
        }
    }, []);
    React.useEffect(() => {
        appService.getKiotviet().then((res) => {
            dispatch({ type: SET_KIOTVIETS, payload: res.data });
        });
    }, [state.callbackKioviet]);

    // setup socket to context
    React.useEffect(() => {
        if (state.info) {
            const socket = io(import.meta.env.VITE_SOCKET_URL, {
                auth: { token: LocalStorage.getToken() },
            });
            dispatch({ type: SET_SOCKET, payload: socket });
        }
    }, [state.info]);

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
            {state?.appBackground?.show && (
                <Snowfall
                    color={state?.appBackground?.color}
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        height: '100vh',
                    }}
                />
            )}
            {/* loading khi đồng bộ */}
            {state.syncLoading && (
                <ContainerLoadingSync>
                    <ContainerLoad>
                        <Row justify="center">
                            <Lottie
                                style={{ height: '300px', width: '300px' }}
                                animationData={loadingSync}
                                loop={true}
                            />
                        </Row>
                        <Row justify="center">
                            <strong>Đang đồng bộ ...</strong>
                        </Row>
                        <div
                            style={{
                                fontStyle: 'italic',
                                width: '100%',
                                fontSize: '12px',
                                textAlign: 'center',
                                marginTop: '10px',
                                fontWeight: 'bold',
                                color: 'blue',
                            }}
                        >
                            Quá trình đồng bộ có thể mất vài phút hãy tải lại dữ liệu khi có thông báo đồng bộ thành
                            công...
                        </div>
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
    max-width: 500px;
`;

export default App;
