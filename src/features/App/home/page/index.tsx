import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import CardReport from '../components/CardReport';
import ChartReport from '../components/ChartReport';
import DatepickerFilter from '../components/Datepicker.Filter';
import { homeService } from '../service';

const { RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'DD/MM/YYYY';

const HomePage = () => {
    const [dateFilter, setDateFilter] = React.useState({
        fromDate: moment().utc().subtract(14, 'day').format('YYYY-MM-DD'),
        toDate: moment().utc().format('YYYY-MM-DD'),
    });

    const {
        data: homes,
        refetch,
        isLoading,
        isRefetching,
    } = useQuery<any>(['homes', dateFilter], () => {
        return homeService.getDashboard(dateFilter);
    });

    const handleChangeDate = React.useCallback((value: any) => {
        setDateFilter({
            fromDate: moment(value.selection.startDate).format('YYYY-MM-DD'),
            toDate: moment(value.selection.endDate).format('YYYY-MM-DD'),
        });
    }, []);

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
                    <ChartReport
                        dataChart={homes?.data?.chartOrder}
                        orderReport={{
                            countWaitConfirmation: homes?.data?.order?.countWaitConfirmation,
                            countInprogress: homes?.data?.order?.countInprogress,
                            countCancelled: homes?.data?.order?.countCancelled,
                            countCompleted: homes?.data?.order?.countCompleted,
                        }}
                    />
                </div>
                <div style={{ width: 'min-content', display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <DatepickerFilter handleChangeDate={handleChangeDate} dateFilter={dateFilter} />
                    <CardReport
                        countReport={{
                            countUsers: homes?.data?.countUsers,
                            countRevenue: homes?.data?.countRevenue?.revenue,
                            countProducts: homes?.data?.countProducts,
                            countOrders: homes?.data?.countOrders,
                        }}
                    />
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
    overflow-x: hidden;
    max-height: 100vh;
`;

const TitleHomeStyled = styled.h2`
    font-weight: 700;
    font-size: 22px;
    padding: 10px 0;
    margin: 0;
`;

export default HomePage;
