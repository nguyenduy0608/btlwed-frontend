import React from 'react';
import styled from 'styled-components';
import { images } from '@/assets/imagesAssets';
import { Button, Row } from 'antd';

const VnPayPage = () => {
    return (
        <Container>
            <div>
                <Row justify="center">
                    <img src={images.logo} alt="logo_app" />
                </Row>
                <h2>Thanh toán thành công</h2>
                <Row justify="center" className="gx-mt-5">
                    <Button
                        onClick={() => {
                            window.location.href = `staka://success?order_id=${1}`;
                        }}
                        type="primary"
                    >
                        Tiếp tục
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
