import ExportButton from '@/components/Button/Export.Button';
import PrintButton from '@/components/Button/Print.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button } from 'antd';
import React from 'react';
import { columns } from '../../product/components/Product.Config';
import Filter from './components/Filter';

const ReportSellPage = () => {
    return (
        <>
            <TopBar
                title="Báo cáo bán hàng"
                extra={[<ExportButton onClick={() => console.log('123')} />, <PrintButton onClick={() => {}} />]}
            />
            <Container>
                <CardComponent title={[<Filter returnFilter={() => {}} key="filter" />]}>
                    <TableComponent
                        // loading={isLoading}
                        // page={page}
                        rowSelect={false}
                        // onChangePage={(_page) => setPage(_page)}
                        // expandedRowRender={rowRender}
                        // onRowSelection={onRowSelection}
                        dataSource={[]}
                        columns={columns(1)}
                        total={0}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default ReportSellPage;
