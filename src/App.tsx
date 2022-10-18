import { Spin } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';
import LocalStorage from './apis/LocalStorage';
import GlobalStyle from './config/global.style';
import { LOADING_COLOR } from './config/theme';
import { APP_LOADING, SET_INFO } from './context/types';
import { authService } from './features/Auth/service';
import MainPage from './features/MainPage';
import useCallContext from './hooks/useCallContext';

function App() {
    const { state, dispatch } = useCallContext();
    const [role, setRole] = React.useState('');

    // loading when going to app
    React.useEffect(() => {
        setTimeout(() => {
            dispatch({ type: APP_LOADING, payload: false });
        }, 2000);
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
        }
    }, []);

    return (
        <SpinLoadingStyled
            spinning={state.appLoading}
            indicator={<HashLoader color={LOADING_COLOR} loading size={60} />}
        >
            <MainPage role={role} />
            {/* define default style */}
            <GlobalStyle />
        </SpinLoadingStyled>
    );
}

const SpinLoadingStyled = styled(Spin)`
    &&& {
        top: 20%;
    }
`;

export default App;
