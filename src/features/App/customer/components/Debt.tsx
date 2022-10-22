import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Form, InputNumber, Row, Segmented, Space } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { DataTypeCustomer, Debtcolumns } from './Customer.Config';
import { CustomerService, DebitService } from '../service';
import Filter from './Filter';
const initialFilterQuery = {};

const DebtPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeCustomer[] | []>([]);
    const [form] = Form.useForm();

    const {
        data: Debt,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['DebtService', page, filterQuery], () => DebitService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypeCustomer[]) => {
        setRowSelected(row);
    }, []);
    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <TopBar title="Lịch sử công nợ" />
            <CardComponent extra={[<Filter returnFilter={returnFilter} key="filter" />]}>
                <TableComponent
                    loading={isRefetching || loadingModal || isLoading}
                    page={page}
                    rowSelect={false}
                    onChangePage={(_page) => setPage(_page)}
                    onRowSelection={onRowSelection}
                    dataSource={Debt ? Debt.data : []}
                    columns={Debtcolumns(page)}
                    total={Debt && Debt?.paging?.totalItemCount}
                />
            </CardComponent>
        </>
    );
};

export default DebtPage;
