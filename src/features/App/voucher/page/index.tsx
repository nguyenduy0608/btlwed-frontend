import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/contants.routes';
import Container from '@/layout/Container';
import { handleObjectEmpty, wait } from '@/utils';
import { Button } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { columns } from '../components/Voucher.Config';
import voucherService from '../service';
import { IFilter } from '../type';
const initialFilterQuery = {};
const VoucherPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);

    const {
        data: voucher,
        refetch,
        isRefetching,
    } = useQuery<any>(['voucherService', page, filterQuery], () => voucherService.get({ page, ...filterQuery }));
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

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

    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery(initialFilterQuery);
            setPage(1);
            setLoadingClearFilter(false);
        });
    };

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
                <CardComponent
                    title={
                        loadingClearFilter ? (
                            <ClearFilterLoading key="clear_filter" />
                        ) : (
                            <Filter returnFilter={returnFilter} key="filter" />
                        )
                    }
                >
                    <TableComponent
                        showTotalResult
                        loading={isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
                        dataSource={voucher ? voucher.data : []}
                        total={voucher && voucher?.paging?.totalItemCount}
                        columns={columns(page)}
                    />
                </CardComponent>
            </Container>
            <ClearFilter
                hidden={
                    Object.values(handleObjectEmpty(filterQuery))?.filter(
                        (item: any) => item !== undefined && item !== ''
                    ).length > 0
                }
                onClick={onClearFilter}
            />
        </>
    );
};

export default VoucherPage;
