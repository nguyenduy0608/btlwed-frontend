import React, { ReactNode } from 'react';
import * as AntdIcons from '@ant-design/icons';

const IconAntd = ({ icon, props, size = '20px' }: { icon: any; size: string; props?: any }) => {
    //@ts-ignore
    const AntdIcon = AntdIcons[icon];

    return <AntdIcon style={{ fontSize: size }} {...props} />;
};

export default IconAntd;
