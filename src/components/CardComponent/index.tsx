import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { Card } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

const CardComponent = ({
    title,
    extra,
    children,
}: {
    title?: string | ReactNode;
    extra?: ReactNode;
    children: ReactNode;
}) => {
    return (
        <CardStyled title={title} extra={extra}>
            {children}
        </CardStyled>
    );
};

const CardStyled = styled(Card)`
    border-radius: 0px;
    box-shadow: ${BOX_SHADOW};
`;

export default CardComponent;
