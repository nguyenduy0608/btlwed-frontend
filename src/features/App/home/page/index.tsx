import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import CardReport from '../components/CardReport';
import { homeService } from '../service';
import axios from 'axios';
import LocalStorage from '@/apis/LocalStorage';

const HomePage = () => {
    const [dateFilter, setDateFilter] = React.useState({
        fromDate: moment().utc().subtract(14, 'day').format('YYYY-MM-DD'),
        toDate: moment().utc().format('YYYY-MM-DD'),
    });
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const {
        data: homes,
        refetch,
        isLoading,
        isRefetching,
    } = useQuery<any>(['homes', dateFilter], () => {
        return axios.get('http://26.75.181.165:8080/countall', { headers });
    });

    return (
        <ContainerStyled>
            <TitleHomeStyled>Tổng quan</TitleHomeStyled>

            <div>
                <CardReport
                    countReport={{
                        countAdmin: homes?.data?.admins,
                        countContract: homes?.data?.contracts,
                        countDepartment: homes?.data?.departments,
                        countEmployee: homes?.data?.employees,
                    }}
                />
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
