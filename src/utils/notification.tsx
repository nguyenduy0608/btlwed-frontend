import { Button, notification, Row, Space } from 'antd';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { images } from '@/assets/imagesAssets';

export const notificationSync = (msg: any, title?: string, onClick?: () => void, showDetail = false) =>
    notification['info']({
        message: <div style={{ fontWeight: 'bold', color: '#038fde' }}>{title || ''}</div>,
        description: (
            <div>
                <Row align="middle" justify="space-between" style={{ flexWrap: 'nowrap' }}>
                    <ContentNotiStyled className="gx-mt-2">{msg}</ContentNotiStyled>
                    {/* popup noti */}
                    <NotiContainerStyled>
                        <Lottie style={{ height: '40px' }} animationData={images.bell} />
                    </NotiContainerStyled>
                </Row>
                {showDetail && (
                    <Row justify="end" className="gx-mb-2 gx-mx-2">
                        <Space>
                            <Button type="primary" onClick={onClick}>
                                Xem chi tiết
                            </Button>
                        </Space>
                    </Row>
                )}
            </div>
        ),
        duration: 10,
        placement: 'bottomRight',
    });
const NotiContainerStyled = styled.div`
    width: 50px;
`;

const ContentNotiStyled = styled.div`
    font-size: 12px;
    flex: 1;
`;
