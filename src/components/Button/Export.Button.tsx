import { Button } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';

const ExportButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            icon={<IconAntd icon="FileExcelOutlined" size="18px" />}
            key="btn_export"
            className="gx-mb-0"
            type="primary"
            onClick={onClick}
        >
            Export
        </Button>
    );
};

export default ExportButton;
