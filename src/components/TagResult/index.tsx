import { Tag } from 'antd';
import React from 'react';

const TagResult = ({ text, color }: { text: string; color: string }) => {
    return <Tag color={color}>{text}</Tag>;
};

export default TagResult;
