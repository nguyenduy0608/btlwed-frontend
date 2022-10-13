import TopBar from '@/components/TopBar';
import { PADDING, RADIUS } from '@/config/theme';
import { DatePicker, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import CardReport from '../components/CardReport';
import ChartReport from '../components/ChartReport';

const { RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'DD/MM/YYYY';

const HomePage = () => {
    const [count, setCount] = React.useState(0);

    return (
        <ContainerStyled>
            <TopBar
                style={{ borderRadius: RADIUS, position: 'relative', marginBottom: '10px' }}
                title="Tổng quan"
                extra={
                    <RangePicker
                        defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                        format={dateFormat}
                    />
                }
            />

            <CardReport />
            <ChartReport />
        </ContainerStyled>
    );
};

const ContainerStyled = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    padding: ${PADDING};
    display: flex;
    flex-direction: column;
    overflow-y: overlay;
    overflow-x: hidden;
`;

export default HomePage;
