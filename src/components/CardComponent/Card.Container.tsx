import { TitleCard } from '@/config/global.style';
import { Col, Row } from 'antd';
import React, { ReactNode } from 'react';

const CardContainer = ({ title, leftCol, rightCol }: { title: string; leftCol: ReactNode; rightCol: ReactNode }) => {
    return (
        <>
            <TitleCard>{title}</TitleCard>
            <Row className="gx-mx-2">
                <Col span={12}>{leftCol}</Col>
                <Col span={12}>{rightCol}</Col>
            </Row>
        </>
    );
};

export default React.memo(CardContainer);
