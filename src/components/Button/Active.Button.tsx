import { Button } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';

const ActiveButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: '#0090FF',
            }}
            onClick={onClick}
        >
            <IconAntd icon="CheckCircleOutlined" />
            Kích hoạt
        </Button>
    );
};

export default React.memo(ActiveButton);
