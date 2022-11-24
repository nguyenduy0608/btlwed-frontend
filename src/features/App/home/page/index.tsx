import TopBar from '@/components/TopBar';
import { PADDING, RADIUS } from '@/config/theme';
import { Col, DatePicker, Row, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import CardReport from '../components/CardReport';
import ChartReport from '../components/ChartReport';
import DatepickerFilter from '../components/Datepicker.Filter';

const { RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'DD/MM/YYYY';

const HomePage = () => {
    const [count, setCount] = React.useState(0);

    return (
        <ContainerStyled>
            {/* <TopBar
                style={{ borderRadius: RADIUS, position: 'relative', marginBottom: '10px' }}
                title="Tổng quan"
                extra={
                    <RangePicker
                        defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                        format={dateFormat}
                    />
                }
            /> */}
            <TitleHomeStyled>Tổng quan</TitleHomeStyled>

            <div className="gx-m-0" style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: 1, height: '100%' }}>
                    <ChartReport />
                </div>
                <div style={{ width: 'min-content', display: 'flex', flexDirection: 'column', marginLeft: '30px' }}>
                    <DatepickerFilter />
                    <CardReport />
                </div>
            </div>
            <TitleHomeStyled />
        </ContainerStyled>
    );
};

const ContainerStyled = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 100vh;
`;

const TitleHomeStyled = styled.h2`
    font-weight: 700;
    font-size: 22px;
    padding: 10px 0 18px 0;
    margin: 0;
`;

export default HomePage;
