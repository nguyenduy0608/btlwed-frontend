import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { selectAll } from '@/service';
import { Segmented } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { IFilter } from '../../voucher/type';
import { columns, DataTypeCustomer } from '../components/Customer.Config';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { CustomerService } from '../service';
const initialFilterQuery = {};

const CustomerPage = () => {
    const { state } = useCallContext();

    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);

    const {
        data: customer,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['customer', page, filterQuery], () => CustomerService.get({ page, ...filterQuery }));

    React.useEffect(() => {
        refetch();
    }, [state.syncLoading]);

    const rowRender = (record: DataTypeCustomer, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description record={record} refetch={refetch} />;
    };

    const returnFilter = React.useCallback(
        (filter: IFilter) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    return (
        <>
            <TopBar
                title="Danh sách khách hàng"
                extra={[
                    <Segmented
                        key="kh"
                        onChange={(value) => setFilterQuery({ ...filterQuery, kiotvietId: value })}
                        options={[
                            selectAll,
                            ...((state?.kiotviets?.map((kiot) => ({ label: kiot.name, value: kiot.id })) || []) as any),
                        ]}
                    />,
                ]}
            />
            <Container>
                <CardComponent
                    title={<Filter returnFilter={returnFilter} key="filter" />}
                    extra={<ExportButton key="extra_btn" onClick={() => console.log('first')} />}
                >
                    <TableComponent
                        showTotalResult
                        loading={isRefetching || loadingModal}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
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
