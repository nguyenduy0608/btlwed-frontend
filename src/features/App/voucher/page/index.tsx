import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/routes';
import Container from '@/layout/Container';
import { Button } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { columns, DataTypeVoucher } from '../components/Voucher.Config';
import voucherService from '../service';
import { IFilter } from '../type';
const initialFilterQuery = {};
const VoucherPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeVoucher[] | []>([]);

    const {
        data: voucher,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['voucherService', page, filterQuery], () => voucherService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypeVoucher[]) => {
        setRowSelected(row);
    }, []);

    const rowRender = (record: any, index: number, indent: number, expanded: any) => {
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

    React.useEffect(() => {
        refetch();
    }, []);

    return (
        <>
            <TopBar
                title="Quản lý voucher"
                extra={[
                    <Button
                        key="add_voucher"
                        onClick={() => navigate(routerPage.voucherForm)}
                        className="gx-mb-0"
                        type="primary"
                    >
                        Thêm mới
                    </Button>,
                ]}
            />
            <Container>
                <CardComponent title="" extra={[<Filter returnFilter={returnFilter} key="filter" />]}>
                    <TableComponent
                        showTotalResult
                        loading={isLoading}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
                        onRowSelection={onRowSelection}
                        dataSource={voucher ? voucher.data : []}
                        columns={columns(page)}
                        total={voucher && voucher?.paging?.totalItemCount}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default VoucherPage;
