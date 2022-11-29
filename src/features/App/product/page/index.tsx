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
import { handleObjectEmpty, wait } from '@/utils';
import { Segmented } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import Filter from '../components/Filter.Product';
import { columnsProduct } from '../components/Product.Config';
import { ProductService } from '../service';

const initialFilterQuery = {};

const ProductPage = () => {
    const { state } = useCallContext();
    const location = useLocation();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    const {
        data: products,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery<any>(['ProductService', page, filterQuery], () => ProductService.get({ page, ...filterQuery }));

    // React.useEffect(() => {
    //     refetch();
    // }, [state.syncLoading]);

    React.useEffect(() => {
        if (location.state) {
            delete location.state?.prevUrl;
            if (location.state?.page !== page) {
                setPage(location.state?.page);
            }
            delete location.state?.page;
            setFilterQuery(location.state);
        }
    }, [location?.state]);

    const returnFilter = React.useCallback(
        (filter: IFilter) => {
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

    return (
        <>
            <TopBar
                title="Sản phẩm"
                extra={
                    <Segmented
                        onChange={(value) => setFilterQuery({ ...filterQuery, kiotvietId: value })}
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
                            <Filter params={filterQuery} returnFilter={returnFilter} key="filterProduct" />
                        )
                    }
                    extra={<ExportButton onClick={() => console.log('first')} />}
                >
                    <TableComponent
                        showTotalResult
                        loading={isRefetching}
                        page={page}
                        onRowClick={(record: { id: number }) =>
                            navigate(`${routerPage.product}/${record.id}`, {
                                state: { ...filterQuery, page, prevUrl: location.pathname },
                            })
                        }
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        dataSource={products ? products.data : []}
                        columns={columnsProduct(page)}
                        total={products?.paging?.totalItemCount || 0}
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
export default ProductPage;
