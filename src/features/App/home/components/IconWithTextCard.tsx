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
            <div className="gx-media gx-align-items-center gx-flex-nowrap">
                <div className="gx-mr-lg-4 gx-mr-3">{icon}</div>
                <div className="gx-media-body">
                    <h1 className="gx-fs-xxl gx-font-weight-bold gx-mb-1">{title}</h1>
                    <span className="gx-text-grey gx-mb-0">{subTitle}</span>
                </div>
            </div>
        </Card>
    );
};

export default IconWithTextCard;
