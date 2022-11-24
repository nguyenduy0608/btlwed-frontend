import IconAntd from '@/components/IconAntd';
import { Button } from 'antd';
import React from 'react';

const SellPrint = ({ row }: any) => {
    const onClick = () => {};

    return (
        <div>
            <Button
                icon={<IconAntd icon="PrinterOutlined" size="18px" />}
                key="btn_export"
                className="gx-mb-0"
                onClick={onClick}
                style={{ backgroundColor: '#3f6600', color: 'white' }}
            />
        </div>
    );
};

export default SellPrint;
