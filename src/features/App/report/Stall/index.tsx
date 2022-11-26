import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { downloadFile, Notification, uuid } from '@/utils';
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

    return (
        <>
            <TopBar title="Báo cáo gian hàng" extra={[<ExportButton key="export" onClick={handleExportExcel} />]} />
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
                            stallReport ? [{ id: uuid(), ...stallReport?.paging?.headerData }, ...stallReport.data] : []
                        }
                        total={stallReport && stallReport?.paging?.totalItemCount}
                        columns={stallColumns(page)}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default ReportStallPage;
