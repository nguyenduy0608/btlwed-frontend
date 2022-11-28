import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { downloadFile, handleObjectEmpty, Notification, uuid, wait } from '@/utils';
import React from 'react';
import { useQuery } from 'react-query';
import Filter from './components/Filter';
import { stallColumns } from './components/Stall.Config';
import { stallService } from './service';
const initialFilterQuery = {};

const ReportStallPage = () => {
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);

    const {
        data: stallReport,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['stallService', page, filterQuery], () => stallService.get({ page, ...filterQuery }));
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const handleExportExcel = React.useCallback(() => {
        stallReport?.paging?.links?.downExcel &&
            stallService
                .getFileExcel(stallReport?.paging?.links?.downExcel, { page, ...filterQuery })
                .then((res: any) => {
                    Notification('success', 'Export thành công');
                    downloadFile(res.path);
                });
    }, [stallReport?.paging?.links?.downExcel, page, filterQuery]);

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
            <TopBar title="Báo cáo gian hàng" extra={[<ExportButton key="export" onClick={handleExportExcel} />]} />
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
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        // expandedRowRender={rowRender}
                        // onRowSelection={onRowSelection}
                        dataSource={
                            stallReport ? [{ id: uuid(), ...stallReport?.paging?.headerData }, ...stallReport.data] : []
                        }
                        total={stallReport && stallReport?.paging?.totalItemCount}
                        columns={stallColumns(page)}
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

export default ReportStallPage;
