import { images } from '@/assets/imagesAssets';
import sync from '@/assets/sync.json';
import IconAntd from '@/components/IconAntd';
import { DefaultSelectStyled } from '@/config/global.style';
import { SET_SYNC_LOADING } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import { Notification as NotiMSG, wait } from '@/utils';
import { Button, Col, Drawer, Popover, Row, Select } from 'antd';
import Lottie from 'lottie-react';
import React from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { syncService } from './service';

const Notification = () => {
    const { state, dispatch } = useCallContext();
    const [kiotVietId, setKiotVietId] = React.useState('');
    console.log('🚀 ~ file: index.tsx ~ line 19 ~ Notification ~ kiotVietId', kiotVietId);
    const navigate = useNavigate();

    const [openNoti, setOpenNoti] = React.useState(false);

    const handleSync = async (type: string) => {
        if (!kiotVietId) return;

        switch (type) {
            case 'category':
                navigate('/product/category');
                // await syncService.sync(+kiotVietId, type);
                break;
            case 'product':
                navigate('/product');
                break;
            case 'user':
                navigate('/customer');
                break;
            case 'order':
                navigate('/order');
                break;
            default:
                break;
        }

        dispatch({ type: SET_SYNC_LOADING, payload: true });
        setOpenNoti(false);
        wait(5000).then(() => {
            dispatch({ type: SET_SYNC_LOADING, payload: false });
            NotiMSG('success', 'Đồng bộ thành công');
        });
    };

    const content = (
        <Row style={{ flexDirection: 'column' }} gutter={[0, 12]}>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('category')}>
                    Đồng bộ danh mục
                </Button>
            </Col>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('product')}>
                    Đồng bộ sản phẩm
                </Button>
            </Col>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('order')}>
                    Đồng bộ đơn hàng
                </Button>
            </Col>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('user')}>
                    Đồng bộ khách hàng
                </Button>
            </Col>
        </Row>
    );

    return (
        <div>
            <Drawer closable={false} open={openNoti} onClose={() => setOpenNoti(false)}>
                <h4 className="gx-mb-4 gx-text-uppercase">
                    <strong>ĐỒNG BỘ</strong>
                </h4>
                <div>
                    <Lottie style={{ height: '200px' }} animationData={sync} />
                    <Row justify="center" className="gx-mx-0 gx-mt-4">
                        <Popover
                            placement="bottom"
                            content={content}
                            title={
                                <div style={{ padding: '10px 4px' }}>
                                    <DefaultSelectStyled
                                        allowClear
                                        onChange={(value: any) => setKiotVietId(value)}
                                        placeholder="Chọn chi nhánh"
                                    >
                                        {state?.kiotviets &&
                                            state?.kiotviets.map((item: any) => (
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                    </DefaultSelectStyled>
                                </div>
                            }
                        >
                            <Button type="primary">Đồng bộ dữ liệu</Button>
                        </Popover>
                    </Row>
                </div>
                <h4 className="gx-my-4 gx-text-uppercase">
                    <strong>CẤU HÌNH</strong>
                </h4>
                <div>Cấu hình</div>
            </Drawer>
            <div className="gx-customizer-option">
                <Button onClick={() => setOpenNoti(true)} type="primary">
                    <IconAntd spin icon="SettingOutlined" />
                </Button>
            </div>

            {/* popup noti */}
            <NotiContainerStyled>
                <div style={{ position: 'relative' }}>
                    <Lottie style={{ height: '120px' }} animationData={images.bell} />
                    <CountStyled>
                        <CountUp start={0} end={99} />
                    </CountStyled>
                </div>
            </NotiContainerStyled>
        </div>
    );
};

export default Notification;

const NotiContainerStyled = styled.div`
    position: fixed;
    bottom: 0;
    right: -10px;
`;

const CountStyled = styled.div`
    position: absolute;
    background-color: red;
    top: 10px;
    right: 20px;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;

    border-radius: 50%;
`;
