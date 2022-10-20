import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Form, InputNumber, Row, Segmented, Space } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { DataTypeCustomer, columns, Purchasecolumns,DataTypePurchase } from '../components/Customer.Config';
import { CustomerService, PurchaseService } from '../service';
import Filter from '../components/Filter';
const initialFilterQuery = {};

const PuchaseHistoryPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeCustomer[] | []>([]);
    const [form] = Form.useForm();

    const {
        data: puchaseHistory,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['PurchaseService', page, filterQuery], () => PurchaseService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypePurchase[]) => {
        setRowSelected(row);
    }, []);
    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <TopBar title="Lịch sử mua hàng" />
                <CardComponent extra={[<Filter returnFilter={returnFilter} key="filter" />]}>
                    <TableComponent
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        onRowSelection={onRowSelection}
                        dataSource={puchaseHistory ? puchaseHistory.data : []}
                        columns={Purchasecolumns(page)}
                        total={puchaseHistory && puchaseHistory?.paging?.totalItemCount}
                    />
                </CardComponent>
        </>
    );
};

export default PuchaseHistoryPage;
