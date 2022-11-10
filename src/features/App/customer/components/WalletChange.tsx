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

const WalletChangePage = ({ customerId }: { customerId: number }) => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();

    const {
        data: walletChanges,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['WalletChangeService', page, filterQuery, customerId], () =>
        WalletChangeService.get({ page, ...filterQuery, user_id: customerId })
    );

    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <CardComponent
                title={<div className="gx-pl-4">Lịch sử tích điểm</div>}
                extra={[<FilterWallet returnFilter={returnFilter} key="filter" />]}
            >
                <div className="gx-mb-3">Tổng điểm hiện tại: {walletChanges?.data?.totalPoint || 0}</div>
                <TableComponent
                    loading={isRefetching}
                    page={page}
                    rowSelect={false}
                    onChangePage={(_page) => setPage(_page)}
                    dataSource={walletChanges ? walletChanges?.data?.listPointChange : []}
                    columns={WalletChangecolumns(page)}
                    total={walletChanges && walletChanges?.paging?.totalItemCount}
                />
            </CardComponent>
        </>
    );
};

export default WalletChangePage;
