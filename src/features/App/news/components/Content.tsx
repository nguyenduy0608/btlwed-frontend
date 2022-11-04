import CustomScrollbars from '@/components/CustomScrollbars';
import IconAntd from '@/components/IconAntd';
import { Col, Row, Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import NewsEditor from '../components/Editor';
import './iphone.css';
const Content = () => {
    const [content, setContent] = React.useState('STAKA');

    return (
        <Row style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '100%', margin: 0 }}>
            <Col style={{ flex: 1 }}>
                <NewsEditor content={content} setContent={setContent} />
            </Col>
            <Col style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Preview</h2>
                <section className="iphoneMock">
                    <div className="container">
                        <div className="iphone">
                            <div className="bordeColor">
                                <div className="backSide"></div>
                                <div className="bordeNegro">
                                    <div className="notch">
                                        <div className="bocina"></div>
                                        <div className="camara"></div>
                                    </div>
                                    <div className="mainScreen">
                                        <StatusbarStyled className="statusBar">
                                            <div className="leftSide">
                                                <div className="operador">Staka</div>
                                                <div className="widgetPlus"></div>
                                            </div>
                                            <div className="rightSide">
                                                <div className="signal mid">
                                                    <i className="bar"></i>
                                                </div>
                                                <div className="datos">5G</div>
                                                <div className="bateria mid"></div>
                                                <div className="exitShake">Listo</div>
                                            </div>
                                        </StatusbarStyled>
                                        <CustomScrollbars>
                                            <div style={{ backgroundColor: 'white', padding: '14px' }}>
                                                <Space>
                                                    <IconAntd size="14px" icon="ArrowLeftOutlined" />
                                                    <span>Staka</span>
                                                </Space>
                                            </div>
                                            <div style={{ backgroundColor: 'rgba(0,0,0,.3)', height: '100%' }}>
                                                <div style={{ padding: '10px 10px 50px 10px' }}>
                                                    <div
                                                        style={{ color: '#fff' }}
                                                        dangerouslySetInnerHTML={{ __html: content }}
                                                    />
                                                </div>
                                            </div>
                                        </CustomScrollbars>
                                        <div className="unlockBar" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Col>
        </Row>
    );
};

const StatusbarStyled = styled.div`
    background-color: #fff;
    & * {
        color: black !important;
        font-weight: bold !important;
    }
`;

export default Content;
