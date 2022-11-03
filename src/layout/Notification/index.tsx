import sync from '@/assets/sync.json';
import IconAntd from '@/components/IconAntd';
import { SET_SYNC_LOADING } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import { wait } from '@/utils';
import { Button, Drawer, Row } from 'antd';
import Lottie from 'lottie-react';
import React from 'react';
const Notification = () => {
    const { dispatch } = useCallContext();

    const [openNoti, setOpenNoti] = React.useState(false);

    return (
        <div>
            <Drawer closable={false} open={openNoti} onClose={() => setOpenNoti(false)}>
                <h4 className="gx-mb-4 gx-text-uppercase">
                    <strong>ĐỒNG BỘ</strong>
                </h4>
                <div>
                    <Lottie style={{ height: '200px' }} animationData={sync} />
                    <Row justify="center" className="gx-mx-0 gx-mt-4">
                        <Button
                            onClick={() => {
                                dispatch({ type: SET_SYNC_LOADING, payload: true });
                                setOpenNoti(false);

                                wait(5000).then(() => dispatch({ type: SET_SYNC_LOADING, payload: false }));
                            }}
                            type="primary"
                        >
                            Đồng bộ dữ liệu
                        </Button>
                    </Row>
                </div>
                <h4 className="gx-my-4 gx-text-uppercase">
                    <strong>CẤU HÌNH</strong>
                </h4>
                <div>Cấu hình</div>
            </Drawer>
            <div className="gx-customizer-option">
                <Button onClick={() => setOpenNoti(true)} type="primary">
                    <IconAntd spin icon="SettingOutlined" />
                </Button>
            </div>
        </div>
    );
};

export default Notification;
