import CustomScrollbars from '@/components/CustomScrollbars';
import IconAntd from '@/components/IconAntd';
import { Col, Row, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import NewsEditor from '../components/Editor';
import './iphone.css';
const Content = ({
    image,
    disabled,
    handleCallbackContent,
    refContent,
    title,
}: {
    image: string;
    disabled?: boolean;
    handleCallbackContent: any;
    refContent?: string;
    title: string;
}) => {
    const [content, setContent] = React.useState('');
    React.useEffect(() => {
        setContent(refContent || '');
    }, [refContent]);
    return (
        <Row style={{ flexDirection: 'row', flexWrap: 'nowrap', width: '100%', margin: 0 }}>
            <Col style={{ flex: 1 }}>
                <NewsEditor
                    disabled={disabled}
                    handleCallbackContent={handleCallbackContent}
                    handleCallbackContentNotDebounce={(value: string) => {
                        setContent(value);
                    }}
                    refContent={refContent}
                />
            </Col>
            {/* phone preview */}
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
                                            {/* <div style={{ backgroundColor: 'white', padding: '14px' }}> */}
                                            <div className="gx-pt-1" style={{ backgroundColor: 'white' }}>
                                                {image && <img src={image} alt="" />}
                                                {title && (
                                                    <div>
                                                        <TitleStyled>{title}</TitleStyled>
                                                        <Row
                                                            align="middle"
                                                            style={{ padding: '0 12px 10px', margin: 0 }}
                                                        >
                                                            <IconAntd
                                                                size="16px"
                                                                style={{ marginRight: '6px' }}
                                                                icon="CalendarOutlined"
                                                            />
                                                            {moment().format('DD/MM/YYYY')}
                                                        </Row>
                                                    </div>
                                                )}

                                                {/* <Space>
                                                    <IconAntd size="14px" icon="ArrowLeftOutlined" />
                                                    <span>{title || 'Staka'}</span>
                                                </Space> */}
                                            </div>
                                            <div
                                                style={{
                                                    height: '100%',
                                                    backgroundColor: content ? 'white' : 'transparent',
                                                }}
                                            >
                                                <div style={{ backgroundColor: '#fff', padding: '0 10px 50px 10px' }}>
                                                    <div dangerouslySetInnerHTML={{ __html: content }} />
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

const TitleStyled = styled.div`
    font-size: 15px;
    background-color: #fff;
    padding: 10px 12px;
    font-weight: 600;
    color: black;
`;

export default React.memo(Content);
