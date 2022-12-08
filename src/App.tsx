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
                setRole(Object.keys(res.data)[0]);
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

    const openNotification = () => {
        const args = {
            message: 'Cập nhật mới',
            description: (
                <>
                    <TagResult
                        text={
                            <>
                                Staging link:{' '}
                                <a style={{ color: 'blue' }} href="http://staging.stakaadmin.winds.vn" target="_blank">
                                    http://staging.stakaadmin.winds.vn
                                </a>
                            </>
                        }
                        color="red"
                    />
                    <div className="gx-p-4">
                        <Timeline
                            pending={
                                <strong>
                                    Tính năng tiếp theo: Nhập hàng, Trả hàng, Chuyển hàng, thông báo ... ...
                                </strong>
                            }
                        >
                            <Timeline.Item color="green">
                                <strong>Danh mục: 2 cấp, Giao diện cập nhật, kéo thả</strong>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <strong>Chi tiết đơn hàng: In báo cáo</strong>
                            </Timeline.Item>
                            <Timeline.Item color="#00CCFF" dot={<IconAntd icon="SmileOutlined" />}>
                                <strong>Bắt lỗi voucher</strong>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <strong>Hiển thị kết quả lọc</strong>
                            </Timeline.Item>
                            <Timeline.Item color="green">
                                <strong>Cập nhật preview tin tức</strong>
                            </Timeline.Item>
                            <Timeline.Item dot={<IconAntd icon="ApartmentOutlined" />} color="#2a69e6">
                                <strong>Sản phẩm: Hiện thị danh mục 2 cấp + Select tìm kiếm danh mục 2 cấp</strong>
                            </Timeline.Item>
                            <Timeline.Item dot={<IconAntd icon="FileExcelOutlined" />} color="green">
                                <strong>Báo cáo: Bán hàng + Gian hàng , Export excel Bán hàng + Gian hàng</strong>
                            </Timeline.Item>
                            <Timeline.Item dot={<IconAntd icon="FileExcelOutlined" />} color="green">
                                <strong>Cấu hình: Thông tin hệ thông - thêm mới gian hàng</strong>
                            </Timeline.Item>
                            <Timeline.Item dot={<IconAntd icon="WindowsOutlined" />} color="red">
                                <strong>
                                    - Trang chủ: Update giao diện tổng quan
                                    <br />- Bộ lọc: Xoá bộ lọc
                                    <br />- Performance: Lazy load
                                    <br />- Hệ thống: <TagResult color="red" text="Chế độ tuyết rơi" />
                                    <br />
                                    <Button
                                        onClick={() => {
                                            dispatch({
                                                type: SET_BG_APP,
                                                payload: true,
                                            });
                                            LocalStorage.setBG('true');
                                        }}
                                        className="gx-mt-3"
                                        type="primary"
                                    >
                                        Trải nghiệm ngay
                                    </Button>
                                </strong>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </>
            ),

            duration: 0,
        };
        notification.open(args);
    };

    React.useEffect(() => {
        DEV_TYPE === 'DEV' && openNotification();
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
