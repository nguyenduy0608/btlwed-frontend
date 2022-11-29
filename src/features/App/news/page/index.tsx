import DeleteButton from '@/components/Button/Detele.Button';
import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/contants.routes';
import Container from '@/layout/Container';
import { handleObjectEmpty, wait } from '@/utils';
import { Button, Switch } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../components/Filter';
import { columns } from '../components/News.config';
import { newService } from '../service';

const initialFilterQuery = {
    search: '',
    statusActive: undefined,
    typeNews: undefined,
    status: undefined,
    createFrom: '',
    createTo: '',
};

const NewsPage = () => {
    const location = useLocation();

    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState([]);
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    const {
        data: news,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['news', page, filterQuery], () => newService.get({ page, ...filterQuery }));

    const navigate = useNavigate();

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
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const onRowSelection = React.useCallback((row: any) => {
        setRowSelected(row);
    }, []);

    const handleConfirmDelete = React.useCallback(() => {
        rowSelected.forEach(async (row: any, index: number) => {
            await newService.delete(row.id);
            if (index === rowSelected.length - 1) {
                setRowSelected([]);
                refetch();
            }
        });
    }, [rowSelected]);

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
                title="Tin tức"
                extra={[
                    rowSelected && rowSelected?.length > 0 && (
                        <DeleteButton key="delete" onConfirm={handleConfirmDelete} />
                    ),
                    <Button
                        onClick={() =>
                            navigate(routerPage.newsForm, {
                                state: { ...filterQuery, page, prevUrl: location.pathname },
                            })
                        }
                        key="add_new"
                        className="gx-mb-0"
                        type="primary"
                    >
                        Thêm mới
                    </Button>,
                ]}
            />
            <Container>
                <CardComponent
                    title={[
                        loadingClearFilter ? (
                            <ClearFilterLoading key="clear_filter" />
                        ) : (
                            <Filter returnFilter={returnFilter} key="filter" />
                        ),
                    ]}
                >
                    <TableComponent
                        showTotalResult
                        loading={isRefetching}
                        page={page}
                        rowSelect
                        onChangePage={(_page) => setPage(_page)}
                        // expandedRowRender={rowRender}
                        onRowClick={(record: { id: number }) =>
                            navigate(routerPage.newsForm + '/' + record.id, {
                                state: { ...filterQuery, page, prevUrl: location.pathname },
                            })
                        }
                        onRowSelection={onRowSelection}
                        dataSource={news?.data || []}
                        columns={[
                            ...columns(page),
                            {
                                title: 'Trạng thái hoạt động',
                                dataIndex: 'statusActive',
                                align: 'center',
                                width: 40,
                                render: (value: number, row: any) => (
                                    <div
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Switch
                                            onChange={(value) => {
                                                newService
                                                    .updateStatus(row.id, {
                                                        statusActive: value,
                                                        title: row.title,
                                                        status: row.status,
                                                        type: row.type,
                                                    })
                                                    .then(() => {
                                                        refetch();
                                                    });
                                            }}
                                            defaultChecked={!!value}
                                        />
                                    </div>
                                ),
                            },
                        ]}
                        total={news?.paging?.totalItemCount}
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

export default NewsPage;
