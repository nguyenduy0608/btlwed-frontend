import React from 'react';
import useCallContext from '@/hooks/useCallContext';
import audiobell from '@/assets/audio/sound.mp3';
import { NotificationType, ROLE_TYPE } from '@/contants';
import { notificationSync } from '@/utils/notification';
import LocalStorage from '@/apis/LocalStorage';

const Socket = () => {
    const { state } = useCallContext();
    console.log('🚀 ~ file: index.tsx:7 ~ Socket ~ state', state);

    const audioRef: any = React.useRef();

    // joinUser
    React.useEffect(() => {
        if (state.socket) {
            if (LocalStorage.getToken()) {
                state.socket.on('notification:created', (data: any) => {
                    if (data?.type_action === NotificationType.ORDER_SHOP) {
                        audioRef.current.play();
                        notificationSync('Có đơn hàng cập nhật trạng thái');
                    }
                });
            }
        }
    }, [state.socket]);

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }}>
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    );
};

export default Socket;
