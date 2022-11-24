import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import React from 'react';
import { columnImportCommodity } from '../components/Config.ImportCommodity';
import FilterImportCommodity from '../components/Filter.ImportCommodity';
const initialFilterQuery = {};

const ImportCommodityPage = () => {
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    return (
        <>
            <TopBar title="Nhập hàng" extra={[<ExportButton key="export" onClick={() => {}} />]} />
            <Container>
                <CardComponent title={[<FilterImportCommodity returnFilter={returnFilter} key="filter" />]}>
                    <TableComponent
                        showTotalResult
                        // loading={isLoading || isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        // expandedRowRender={rowRender}
                        // onRowSelection={onRowSelection}
                        dataSource={[]}
                        total={0}
                        columns={columnImportCommodity(page)}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default ImportCommodityPage;
