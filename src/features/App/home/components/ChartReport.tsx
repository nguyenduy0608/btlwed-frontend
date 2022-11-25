import React from 'react';
import styled from 'styled-components';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Col, Row, Typography, Tooltip as TooltipAntd } from 'antd';
import { BOX_SHADOW, RADIUS } from '@/config/theme';
const { Title } = Typography;

const data = [
    { name: 'T1', ht: 60, tc: 24 },
    { name: 'T2', ht: 50, tc: 18 },
    { name: 'T3', ht: 20, tc: 0 },
    { name: 'T4', ht: 27, tc: 8 },
    { name: 'T5', ht: 18, tc: 40 },
    { name: 'T6', ht: 23, tc: 0 },
    { name: 'T7', ht: 34, tc: 3 },
    { name: 'T8', ht: 30, tc: 40 },
    { name: 'T9', ht: 40, tc: 30 },
    { name: 'T10', ht: 3, tc: 2 },
    { name: 'T11', ht: 4, tc: 40 },
    { name: 'T12', ht: 9, tc: 1 },
];

const ChartReport = () => {
    return (
        <ReportChartStyled>
            <RowStyled className="gx-m-0 gx-p-0 gx-mb-3" justify="center">
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-3 gx-py-3">
                    <TooltipAntd color="#1890ff" title="Chờ xác nhận">
                        <ColStyled index={1}>
                            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>123</span>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-3 gx-py-3">
                    <TooltipAntd color="#998CEB" title="Đang xử lý">
                        <ColStyled index={2}>
                            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>1234</span>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-3 gx-py-3">
                    <TooltipAntd color="#5BB318" title="Hoàn thành">
                        <ColStyled index={3}>
                            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>12345</span>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-3 gx-py-3">
                    <TooltipAntd color="#E16E93" title="Huỷ/ Từ chối">
                        <ColStyled index={4}>
                            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>123456</span>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
            </RowStyled>
            {/* </TopBoxStyled> */}
            <BoxChart style={{ flex: 1, minHeight: '250px' }}>
                <ResponsiveContainer width="100%">
                    <LineChart data={data} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line name="Hoàn thành" type="monotone" dataKey="ht" stroke="#003366" activeDot={{ r: 8 }} />
                        <Line name="Huỷ/Từ chối" type="monotone" dataKey="tc" stroke="#FE9E15" />
                    </LineChart>
                </ResponsiveContainer>
            </BoxChart>
        </ReportChartStyled>
    );
};

const ReportChartStyled = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const TopBoxStyled = styled.div`
    background-color: #fff;
    box-shadow: ${BOX_SHADOW};
    padding: 20px;
    border-radius: ${RADIUS};
`;

const RowStyled = styled(Row)`
    padding: 0 40px;
    margin: 30px 0;
`;

const ColStyled = styled(Col)<{ color?: string; index?: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 2px solid ${(props) => (props.color ? props.color : '#ccc')}; */
    padding: 20px 0;
    border-radius: ${RADIUS};
    position: relative;
    box-shadow: ${BOX_SHADOW};
    ${(props) =>
        props?.index === 1 &&
        'background-color: #0093E9;background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);'};
    ${(props) => props?.index === 2 && 'background: linear-gradient(33deg, #DEB0DF, #A16BFE);'};

    ${(props) => props?.index === 3 && 'background: linear-gradient(33deg, #54E38E, #41C7AF);'};
    ${(props) => props?.index === 4 && 'background: linear-gradient(33deg, #E16E93, #9D2E7D);'};
`;

const TitleColStyled = styled.div`
    position: absolute;
    top: -10px;
    background-color: white;
    padding: 0 20px;
    font-weight: bold;
`;

const BoxChart = styled.div`
    padding: 30px 40px 20px 10px;
    box-shadow: ${BOX_SHADOW};
    background-color: white;
    border-radius: ${RADIUS};
`;

export default ChartReport;
