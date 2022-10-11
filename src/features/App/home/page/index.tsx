import TopBar from '@/components/TopBar';
import { PADDING } from '@/config/theme';
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
    max-height: 100vh;
    height: 100%;
    width: 100%;
    padding: ${PADDING};
    display: flex;
    flex-direction: column;
`;

export default HomePage;
