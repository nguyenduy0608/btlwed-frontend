import React, { ReactNode } from 'react';
import * as AntdIcons from '@ant-design/icons';

const IconAntd = ({ icon, props }: { icon: any; props?: any }) => {
    //@ts-ignore
    const AntdIcon = AntdIcons[icon];

    return <AntdIcon style={{ fontSize: '20px' }} {...props} />;
};

export default IconAntd;
