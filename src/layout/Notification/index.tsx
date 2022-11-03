import Lottie from 'lottie-react';
import React from 'react';
import sync from '@/assets/sync.json';
import CardComponent from '@/components/CardComponent';
import { Button, Drawer, Row } from 'antd';
import IconAntd from '@/components/IconAntd';
import useCallContext from '@/hooks/useCallContext';
import { SET_SYNC_LOADING } from '@/context/types';
const Notification = () => {
    const { dispatch } = useCallContext();

    const [openNoti, setOpenNoti] = React.useState(false);

    return (
        <div>
            <Drawer closable={false} open={openNoti} onClose={() => setOpenNoti(false)}>
                <div style={{ height: '200px', boxShadow: '' }}>
                    <Lottie style={{ height: '200px' }} animationData={sync} />
                    <Row justify="center" className="gx-mx-0 gx-mt-4">
                        <Button
                            onClick={() => {
                                dispatch({ type: SET_SYNC_LOADING, payload: true });
                                setOpenNoti(false);

                                setTimeout(() => {
                                    dispatch({ type: SET_SYNC_LOADING, payload: false });
                                }, 3000);
                            }}
                            type="primary"
                        >
                            Đồng bộ dữ liệu
                        </Button>
                    </Row>
                </div>
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
