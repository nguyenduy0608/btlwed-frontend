import CardComponent from '@/components/CardComponent';
import IconAntd from '@/components/IconAntd';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/routes';
import Container from '@/layout/Container';
import { Button, Segmented, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import Filter from '../components/Filter.Product';
import { columnsProduct, DataTypeProduct } from '../components/Product.Config';
import { ProductService } from '../service';
const initialFilterQuery = {};
const ProductPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeProduct[] | []>([]);

    const {
        data: products,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['ProductService', page, filterQuery], () => ProductService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypeProduct[]) => {
        setRowSelected(row);
    }, []);

    const returnFilter = React.useCallback((filter: IFilter) => {
        setPage(1);
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <TopBar title="Sản phẩm" extra={<Segmented options={['Hà Nội', 'Vinh', 'Hồ Chí Minh']} />} />
            <Container>
                <CardComponent
                    title={<Filter returnFilter={returnFilter} key="filterProduct" />}
                    extra={
                        <Button
                            icon={<IconAntd icon="FileExcelOutlined" size="18px" />}
                            key="btn_export"
                            className="gx-mb-0"
                            type="primary"
                        >
                            Export
                        </Button>
                    }
                >
                    <TableComponent
                        loading={isRefetching}
                        page={page}
                        onRowClick={(record: { id: number }) => navigate(`${routerPage.product}/${record.id}`)}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        onRowSelection={onRowSelection}
                        dataSource={products ? products.data : []}
                        columns={columnsProduct(page)}
                        total={products?.paging?.totalItemCount || 0}
                    />
                </CardComponent>
            </Container>
        </>
    );
};
export default ProductPage;
