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
import { sellColumns } from './components/Sell.Config';
import { sellService } from './service';

const initialFilterQuery = {};

const ReportSellPage = () => {
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);

    const {
        data: sellReport,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['sellService', page, filterQuery], () => sellService.get({ page, ...filterQuery }));
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const handleExportExcel = React.useCallback(() => {
        sellReport?.paging?.links?.downExcel &&
            sellService
                .getFileExcel(sellReport?.paging?.links?.downExcel, { page, ...filterQuery })
                .then((res: any) => {
                    // downloadFile(res.path);
                    Notification('success', 'Export thành công');
                    downloadFile(res?.path || 'https://dev.stakaapi.winds.vn/uploads/file/sale_report.xlsx');
                });
    }, [sellReport?.paging?.links?.downExcel, page, filterQuery]);

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
            <TopBar title="Báo cáo bán hàng" extra={[<ExportButton key="export" onClick={handleExportExcel} />]} />
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
                        loading={isLoading || isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        // expandedRowRender={rowRender}
                        // onRowSelection={onRowSelection}
                        dataSource={
                            sellReport ? [{ id: uuid(), ...sellReport?.paging?.headerData }, ...sellReport.data] : []
                        }
                        total={sellReport && sellReport?.paging?.totalItemCount}
                        columns={sellColumns(page)}
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

export default ReportSellPage;
