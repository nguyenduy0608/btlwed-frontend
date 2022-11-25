import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { downloadFile, uuid } from '@/utils';
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
                    downloadFile('http://dev.stakaapi.winds.vn/uploads/file/sale_report.xlsx');
                });
    }, [sellReport?.paging?.links?.downExcel, page, filterQuery]);

    return (
        <>
            <TopBar title="Báo cáo bán hàng" extra={[<ExportButton key="export" onClick={handleExportExcel} />]} />
            <Container>
                <CardComponent title={[<Filter returnFilter={returnFilter} key="filter" />]}>
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
        </>
    );
};

export default ReportSellPage;
