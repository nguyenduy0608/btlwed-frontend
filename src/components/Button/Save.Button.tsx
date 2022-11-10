import { Button } from 'antd';
import { ButtonHTMLType } from 'antd/lib/button/button';
import React from 'react';
import IconAntd from '../IconAntd';

const SaveButton = ({ onClick, htmlType = 'button' }: { onClick?: () => void; htmlType?: ButtonHTMLType }) => {
    return (
        <Button
            htmlType={htmlType}
            type="primary"
            className="gx-mb-0"
            onClick={onClick && onClick}
            icon={<IconAntd size="16px" icon="SaveOutlined" />}
        >
            Lưu
        </Button>
    );
};

export default SaveButton;
