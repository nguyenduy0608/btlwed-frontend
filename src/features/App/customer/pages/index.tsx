import DeleteButton from '@/components/Button/Detele.Button';
import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Segmented, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { IFilter } from '../../voucher/type';
import { columns, DataTypeCustomer } from '../components/Customer.Config';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { CustomerService } from '../service';
const initialFilterQuery = {};

const CustomerPage = () => {
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeCustomer[] | null>(null);

    const {
        data: customer,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['customer', page, filterQuery], () => CustomerService.get({ page, ...filterQuery }));

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
                            {rowSelected && rowSelected.length > 0 && (
                                <DeleteButton onConfirm={() => console.log('kkk')} />
                            )}
                            <ExportButton onClick={() => console.log('first')} />
                        </Space>
                    }
                >
                    <TableComponent
                        loading={isRefetching || loadingModal || isLoading}
                        page={page}
                        rowSelect
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
                        onRowSelection={onRowSelection}
                        dataSource={customer ? customer.data : []}
                        columns={columns(page)}
                        total={customer && customer?.paging?.totalItemCount}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default CustomerPage;
