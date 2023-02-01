import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { Col, Row, Tooltip as TooltipAntd } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

const textReportStyle: any = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '17px',
    textAlign: 'center',
    marginBottom: '4px',
};
const textNote = { color: '#fff', fontSize: '12px', fontWeight: '600' };

const ChartReport = ({
    orderReport,
    dataChart,
}: {
    orderReport: {
        countWaitConfirmation: number;
        countInprogress: number;
        countCancelled: number;
        countCompleted: number;
    };
    dataChart: any;
}) => {
    const handleDataChart = dataChart?.labels?.map((item: string, index: number) => {
        return {
            name: item,
            wait_confirmation: dataChart?.datasets[0]?.data[index],
            inprogress: dataChart?.datasets[1]?.data[index],
            cancelled: dataChart?.datasets[2]?.data[index],
            completed: dataChart?.datasets[3]?.data[index],
        };
    });

    return (
        <ReportChartStyled>
            <RowStyled className="gx-m-0 gx-p-0 gx-mb-3" justify="center">
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-2 gx-py-2">
                    <TooltipAntd color="#1890ff" title="Chờ xác nhận">
                        <ColStyled index={1}>
                            <div>
                                <div style={textReportStyle}>
                                    <CountUp separator=" " end={orderReport?.countWaitConfirmation || 0} />
                                </div>
                                <div style={textNote}>Chờ xác nhận</div>
                            </div>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-2 gx-py-2">
                    <TooltipAntd color="#998CEB" title="Đang xử lý">
                        <ColStyled index={2}>
                            <div>
                                <div style={textReportStyle}>
                                    <CountUp separator=" " end={orderReport?.countInprogress || 0} />
                                </div>
                                <div style={textNote}>Đang xử lý</div>
                            </div>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-2 gx-py-2">
                    <TooltipAntd color="#5BB318" title="Hoàn thành">
                        <ColStyled index={3}>
                            <div>
                                <div style={textReportStyle}>
                                    <CountUp separator=" " end={orderReport?.countCompleted || 0} />
                                </div>
                                <div style={textNote}>Hoàn thành</div>
                            </div>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-2 gx-py-2">
                    <TooltipAntd color="#E16E93" title="Huỷ/ Từ chối">
                        <ColStyled index={4}>
                            <div>
                                <div style={textReportStyle}>
                                    <CountUp separator=" " end={orderReport?.countCancelled || 0} />
                                </div>
                                <div style={textNote}>Huỷ/ Từ chối</div>
                            </div>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
            </RowStyled>
            {/* </TopBoxStyled> */}
            <BoxChart style={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={handleDataChart || []} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line
                            name="Chờ xác nhận"
                            type="monotone"
                            dataKey="wait_confirmation"
                            stroke="blue"
                            activeDot={{ r: 8 }}
                        />
                        <Line
                            name="Đang xử lý"
                            type="monotone"
                            dataKey="inprogress"
                            stroke="#003366"
                            activeDot={{ r: 8 }}
                        />
                        <Line
                            name="Hoàn thành"
                            type="monotone"
                            dataKey="completed"
                            stroke="green"
                            activeDot={{ r: 8 }}
                        />
                        <Line name="Huỷ/Từ chối" type="monotone" dataKey="cancelled" stroke="#FE9E15" />
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
    padding: 14px 0;
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
    padding: 30px 30px 20px 10px;
    box-shadow: ${BOX_SHADOW};
    background-color: white;
    border-radius: ${RADIUS};
`;

export default React.memo(ChartReport);
