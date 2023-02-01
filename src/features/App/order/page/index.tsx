import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/contants.routes';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { selectAll } from '@/service';
import { downloadFile, handleObjectEmpty, Notification, wait } from '@/utils';
import { Segmented } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../../product/service';
import Filter from '../components/FIlter';
import { columns } from '../components/Order.Config';
import { OrderService } from '../service';
const initialFilterQuery = {};

const initialValue = {
    name: '',
    order: '',
};

const OrderPage = () => {
    const { state } = useCallContext();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [loadingExcel, setLoadingExcel] = React.useState<boolean>(false);
    const {
        data: order,
        refetch,
        isRefetching,
    } = useQuery<any>(['OrderService', page, filterQuery], () => OrderService.get({ page, ...filterQuery }));

    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    React.useEffect(() => {
        refetch();
    }, [state.syncLoading]);

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery(initialFilterQuery);
            setPage(1);
            setLoadingClearFilter(false);
        });
    };
    const handleExport = async () => {
        setLoadingExcel(true);

        try {
            const res: any = await OrderService.exportExcel(filterQuery);
            // downloadFile(res.data);
            window.open(res?.data, '_blank');
            Notification('success', 'Export thành công');
            setLoadingExcel(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <TopBar
                title="Đơn hàng"
                extra={
                    <Segmented
                        onChange={(value) => {
                            setPage(1);
                            setFilterQuery({ ...filterQuery, kiotvietId: value });
                        }}
                        options={[
                            selectAll,
                            ...((state?.kiotviets?.map((kiot) => ({ label: kiot.name, value: kiot.id })) || []) as any),
                        ]}
                    />
                }
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
                    extra={[
                        // <PrintButton key="print" onClick={() => {}} />,
                        <ExportButton key="export" onClick={handleExport} />,
                    ]}
                >
                    <TableComponent
                        reLoadData={() => refetch()}
                        showTotalResult
                        loading={isRefetching || loadingExcel}
                        page={page}
                        rowSelect={false}
                        onRowClick={(record: { id: number }) => navigate(`${routerPage.order}/${record.id}`)}
                        onChangePage={(_page) => setPage(_page)}
                        dataSource={order?.data}
                        columns={columns(page)}
                        total={order && order?.paging?.totalItemCount}
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

export default OrderPage;
