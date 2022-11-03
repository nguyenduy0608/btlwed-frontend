import ExportButton from '@/components/Button/Export.Button';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/routes';
import Container from '@/layout/Container';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { columns } from '../../product/components/Product.Config';
import Filter from '../components/Filter';

const NewsPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <TopBar
                title="Báo cáo bán hàng"
                extra={[
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

export default NewsPage;
