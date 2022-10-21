import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Form, InputNumber, Row, Segmented, Space } from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { IFilter } from '../../voucher/type';
import Description from '../components/Description';
import { DataTypeCustomer, columns } from '../components/Customer.Config';
import { CustomerService } from '../service';
import Filter from '../components/Filter';
const initialFilterQuery = {};

const CustomerPage = () => {
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeCustomer[] | []>([]);

    const {
        data: category,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['CategoryService', page, filterQuery], () => CustomerService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypeCustomer[]) => {
        setRowSelected(row);
    }, []);

    const rowRender = (record: DataTypeCustomer, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description record={record} refetch={refetch} />;
    };

    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <TopBar
                title="Danh sách khách hàng"
                extra={[<Segmented key="province" options={['Hà Nội', 'Đà Lạt', 'Hồ Chí Minh']} />]}
            />
            <Container>
                <CardComponent
                    title={<Filter returnFilter={returnFilter} key="filter" />}
                    extra={
                        <Space>
                            <Button key="delete" danger className="gx-mb-0" type="dashed">
                                Xóa
                            </Button>
                            <Button key="export" type="primary" className="gx-mb-0">
                                Export
                            </Button>
                        </Space>
                    }
                >
                    <TableComponent
                        loading={isRefetching || loadingModal || isLoading}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
                        onRowSelection={onRowSelection}
                        dataSource={category ? category.data : []}
                        columns={columns(page)}
                        total={category && category?.paging?.totalItemCount}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default CustomerPage;
