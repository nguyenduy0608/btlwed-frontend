import { notification, Row } from 'antd';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { images } from '@/assets/imagesAssets';

export const notificationSync = (msg: any) =>
    notification['info']({
        message: 'Thông báo',
        description: (
            <Row align="middle" justify="space-between">
                <ContentNotiStyled className="gx-mt-4">{msg}</ContentNotiStyled>
                {/* popup noti */}
                <NotiContainerStyled>
                    <Lottie style={{ height: '60px' }} animationData={images.bell} />
                </NotiContainerStyled>
            </Row>
        ),
    });
const NotiContainerStyled = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`;

const ContentNotiStyled = styled.div`
    padding: 4px 0 6px 0;
    font-size: 16px;
    font-weight: 500;
`;
