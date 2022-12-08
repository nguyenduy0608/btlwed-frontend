import { Button, notification, Row, Space } from 'antd';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { images } from '@/assets/imagesAssets';

export const notificationSync = (msg: any, title?: string, onClick?: () => void) =>
    notification['info']({
        message: 'Thông báo ' + (title || ''),
        description: (
            <div>
                <Row align="middle" justify="space-between" style={{ flexWrap: 'nowrap' }}>
                    <ContentNotiStyled className="gx-mt-2">{msg}</ContentNotiStyled>
                    {/* popup noti */}
                    <NotiContainerStyled>
                        <Lottie style={{ height: '60px' }} animationData={images.bell} />
                    </NotiContainerStyled>
                </Row>
                <Row justify="end" className="gx-my-2 gx-mx-2">
                    <Space>
                        <Button type="primary" onClick={onClick}>
                            Xem chi tiết
                        </Button>
                    </Space>
                </Row>
            </div>
        ),
        duration: 0,
    });
const NotiContainerStyled = styled.div`
    width: 50px;
`;

const ContentNotiStyled = styled.div`
    padding: 4px 0 6px 0;
    font-size: 16px;
    font-weight: 500;
    flex: 1;
`;
