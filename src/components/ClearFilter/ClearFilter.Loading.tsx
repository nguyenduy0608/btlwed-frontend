import { Skeleton, Space } from 'antd';
import React from 'react';

const ClearFilterLoading = () => {
    return (
        <Space>
            <Skeleton.Input active />
            <Skeleton.Input active />
            <Skeleton.Input active />
        </Space>
    );
};

export default ClearFilterLoading;
