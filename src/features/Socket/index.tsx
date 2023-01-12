import LocalStorage from '@/apis/LocalStorage';
import audiobell from '@/assets/audio/sound.mp3';
import { routerPage } from '@/config/contants.routes';
import { ADMIN } from '@/contants';
import { SET_COUNT_NOTI, SET_SYNC_LOADING } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import { notificationSync } from '@/utils/notification';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ORDER_TYPE, SYNC } from './contants';

const Socket = () => {
    const { state, dispatch } = useCallContext();
    const navigate = useNavigate();

    const audioRef: any = React.useRef();

    // joinUser
    React.useEffect(() => {
        if (state.socket?.connected) {
            if (LocalStorage.getToken() && state?.info?.group !== ADMIN.news) {
                state.socket.on('notification:created', (data: any) => {
                    audioRef.current.play();

                    if (SYNC.includes(data?.data?.df_notification_id)) {
                        dispatch({ type: SET_SYNC_LOADING, payload: false });
                    }

                    notificationSync(
                        data?.data?.content,
                        data?.data?.title,
                        () => navigate(routerPage.order + '/' + data?.data?.data?.id),
                        ORDER_TYPE.includes(data?.data?.df_notification_id)
                    );
                    setTimeout(() => {
                        dispatch({
                            type: SET_COUNT_NOTI,
                        });
                    }, 2000);
                });
            }

            // state.socket.onAny((event, ...args) => {
            //     console.log('🚀 ~ file: index.tsx:19 ~ state.socket.on ~ event', event);
            //     console.log('🚀 ~ file: index.tsx:19 ~ state.socket.on ~ args', args);
            // });
        }
    }, [state.socket?.connected]);

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }}>
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    );
};

export default Socket;
