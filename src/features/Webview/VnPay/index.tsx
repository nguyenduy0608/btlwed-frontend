import React from 'react';
import styled from 'styled-components';
import { images } from '@/assets/imagesAssets';
import { Button, Row } from 'antd';
import { currencyFormat } from '@/utils';
import TagResult from '@/components/TagResult';

const VnPayPage = () => {
    const params = new URLSearchParams(window.location.search);
    const obj = Object.fromEntries(params);
    const { vnp_TxnRef } = obj;
    return (
        <Container>
            <div>
                <Row justify="center" className="gx-mb-4">
                    <img src={images.logo} alt="logo_app" />
                </Row>
                <Row justify="center">
                    {obj?.vnp_ResponseCode !== '00' ? (
                        <TagResult
                            style={{ fontSize: '14px', padding: '8px 20px' }}
                            color="error"
                            text="Thanh toán thất bại"
                        />
                    ) : (
                        <TagResult
                            style={{ fontSize: '14px', padding: '8px 20px' }}
                            color="success"
                            text="Thanh toán thành công"
                        />
                    )}
                </Row>
                <Row justify="center" className="gx-mt-4">
                    <span className="gx-mr-2">Số tiền: </span>
                    <strong>{currencyFormat(+obj?.vnp_Amount)}</strong>
                </Row>
                <Row justify="center" className="gx-mt-5">
                    <Button
                        onClick={() => {
                            obj?.vnp_ResponseCode !== '00'
                                ? (window.location.href = 'staka://failed/')
                                : (window.location.href = `staka://success?order_id=${vnp_TxnRef?.split('_')?.[0]}`);
                        }}
                        type="primary"
                    >
                        Quay lại ứng dụng
                    </Button>
                </Row>
            </div>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        width: 200px;
    }

    & h2 {
        font-weight: bold;
        margin-top: 20px;
    }
`;

export default VnPayPage;
