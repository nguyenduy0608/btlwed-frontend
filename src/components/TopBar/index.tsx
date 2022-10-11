import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { Typography } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
const { Title } = Typography;

const TopBar = ({ title, extra, style }: { title: string; extra?: ReactNode; style?: React.CSSProperties }) => {
    return (
        <HeaderStyled style={style}>
            <Title level={4} className="gx-m-0 gx-font-weight-bold">
                {title}
            </Title>
            {extra}
        </HeaderStyled>
    );
};
const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 12px 20px;
    border-radius: ${RADIUS};
    box-shadow: ${BOX_SHADOW};
    margin-bottom: 10px;
`;
export default React.memo(TopBar);
