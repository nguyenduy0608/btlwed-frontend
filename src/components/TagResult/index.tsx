import { Tag } from 'antd';
import React, { ReactNode } from 'react';

const TagResult = ({ text, color }: { text: string | ReactNode; color: string }) => {
    return (
        <Tag className="gx-mb-0" color={color} style={{ fontWeight: 700 }}>
            {text}
        </Tag>
    );
};

export default TagResult;
