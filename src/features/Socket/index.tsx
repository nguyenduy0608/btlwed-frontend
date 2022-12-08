import React from 'react';
import useCallContext from '@/hooks/useCallContext';
import audiobell from '@/assets/audio/sound.mp3';
import { NotificationType, ROLE_TYPE } from '@/contants';
import { notificationSync } from '@/utils/notification';
import LocalStorage from '@/apis/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { routerPage } from '@/config/contants.routes';
import { SET_COUNT_NOTI } from '@/context/types';

const Socket = () => {
    const { state, dispatch } = useCallContext();
    const navigate = useNavigate();

    const audioRef: any = React.useRef();

    // joinUser
    React.useEffect(() => {
        if (state.socket?.connected) {
            console.log('🚀 ~ file: index.tsx:19 ~ React.useEffect ~ state', state);
            if (LocalStorage.getToken()) {
                state.socket.on('notification:created', (data: any) => {
                    console.log('🚀 ~ file: index.tsx:19 ~ state.socket.on ~ data', data);
                    if (data?.type_action === NotificationType.ORDER_SHOP) {
                        audioRef.current.play();
                        notificationSync(data?.data?.content, data?.data?.title, () =>
                            navigate(routerPage.order + '/' + data?.data?.data?.id)
                        );
                        dispatch({
                            type: SET_COUNT_NOTI,
                        });
                    }
                });
            }

            // state.socket.onAny((event, ...args) => {
            //     console.log('🚀 ~ file: index.tsx:19 ~ state.socket.on ~ event', event);
            //     console.log('🚀 ~ file: index.tsx:19 ~ state.socket.on ~ args', args);
            // });
        }
        // notificationSync(1, '2', () => navigate(routerPage.order + '/' + 2));
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
