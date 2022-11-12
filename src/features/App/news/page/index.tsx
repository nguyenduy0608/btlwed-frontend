import DeleteButton from '@/components/Button/Detele.Button';
import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/routes';
import Container from '@/layout/Container';
import { Button, Switch } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Filter from '../components/Filter';
import { columns } from '../components/News.config';
import { newService } from '../service';

const initialFilterQuery = {
    search: '',
    statusActive: undefined,
    typeNews: undefined,
    status: undefined,
    fromDate: '',
    toDate: '',
};

const NewsPage = () => {
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState([]);

    const {
        data: news,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['news', page, filterQuery], () => newService.get({ page, ...filterQuery }));

    const navigate = useNavigate();

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

    return (
        <>
            <TopBar
                title="Tin tức"
                extra={[
                    rowSelected && rowSelected?.length > 0 && <DeleteButton key="delete" onConfirm={() => {}} />,
                    <Button
                        onClick={() => navigate(routerPage.newsForm)}
                        key="add_new"
                        className="gx-mb-0"
                        type="primary"
                    >
                        Thêm mới
                    </Button>,
                ]}
            />
            <Container>
                <CardComponent title={[<Filter returnFilter={returnFilter} key="filter" />]}>
                    <TableComponent
                        loading={isLoading}
                        page={page}
                        rowSelect
                        onChangePage={(_page) => setPage(_page)}
                        // expandedRowRender={rowRender}
                        onRowClick={(record: any) => navigate(routerPage.newsForm + '/' + record.id)}
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
        </>
    );
};

export default NewsPage;
