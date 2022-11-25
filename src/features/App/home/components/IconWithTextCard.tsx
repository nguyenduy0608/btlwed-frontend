import { Card } from 'antd';
import React, { ReactNode } from 'react';

interface IProps {
    icon?: ReactNode;
    title: string;
    subTitle: string;
}

const IconWithTextCard = (props: IProps) => {
    const { icon, title, subTitle } = props;

    return (
        <Card bodyStyle={{ padding: '16px 24px' }} className="gx-card-widget gx-mb-10">
            <div className="gx-media" style={{ flexDirection: 'column', alignItems: 'center' }}>
                <div>{icon}</div>
                <div className="gx-media-body">
                    <h1 className="gx-fs-xxl gx-font-weight-bold gx-my-1 gx-text-center">{title}</h1>
                    <span className="gx-text-grey gx-mb-0">{subTitle}</span>
                </div>
            </div>
        </Card>
    );
};

export default IconWithTextCard;
