import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Form, InputNumber, Row, Segmented, Space } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { DataTypeWalletChange, WalletChangecolumns } from './Customer.Config';
import { WalletChangeService } from '../service';
import Filter from './Filter';
import FilterWallet from './FilterWallet';
import { title } from 'process';
const initialFilterQuery = {};

const WalletChangePage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeWalletChange[] | []>([]);
    const [form] = Form.useForm();

    const {
        data: walletChange,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['WalletChangeService', page, filterQuery], () =>
        WalletChangeService.get({ page, ...filterQuery })
    );

    const onRowSelection = React.useCallback((row: DataTypeWalletChange[]) => {
        setRowSelected(row);
    }, []);
    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <CardComponent
                title="Lịch sử tích điểm"
                extra={[<FilterWallet returnFilter={returnFilter} key="filter" />]}
            >
                <TableComponent
                    loading={isRefetching || loadingModal || isLoading}
                    page={page}
                    rowSelect={false}
                    onChangePage={(_page) => setPage(_page)}
                    onRowSelection={onRowSelection}
                    dataSource={walletChange ? walletChange.data : []}
                    columns={WalletChangecolumns(page)}
                    total={walletChange && walletChange?.paging?.totalItemCount}
                />
            </CardComponent>
        </>
    );
};

export default WalletChangePage;
