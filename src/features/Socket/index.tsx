import React from 'react';
import useCallContext from '@/hooks/useCallContext';
import audiobell from '@/assets/audio/sound.mp3';

const Socket = () => {
    const { state } = useCallContext();

    const audioRef: any = React.useRef();

    // joinUser
    React.useEffect(() => {
        if (state.socket) {
            state.socket.emit('joinUser', state.info.id);
        }
    }, [state.socket, state.info]);

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }}>
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    );
};

export default Socket;
