import AppLoading from '@/assets/appLoading.json';
import { Spin } from 'antd';
import Lottie from 'lottie-react';
import React from 'react';
import styled from 'styled-components';
import LocalStorage from './apis/LocalStorage';
import GlobalStyle from './config/global.style';
import { APP_LOADING, SET_INFO, SET_KIOTVIETS } from './context/types';
import { authService } from './features/Auth/service';
import MainPage from './features/MainPage';
import useCallContext from './hooks/useCallContext';
import { appService } from './service';

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
            <MainPage role={role} />
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

export default App;
