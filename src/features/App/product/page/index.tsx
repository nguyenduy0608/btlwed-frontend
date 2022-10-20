import TableComponent from '@/components/TableComponent';
import { Button, Card, Descriptions, Segmented } from 'antd';
import React from 'react';
import { DataTypeProduct, columnsProduct } from '../components/Product.Config';
import { Tabs, Form } from 'antd';
import TopBar from '@/components/TopBar';
import CardComponent from '@/components/CardComponent';
import { PADDING } from '@/config/theme';
import Container from '@/layout/Container';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { useQuery } from 'react-query';
import Filter from '../components/Filter';
import { ProductService } from './service';
const initialFilterQuery = {};
const ProductPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeProduct[] | []>([]);

    const {
        data: product,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['ProductService', page, filterQuery], () => ProductService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypeProduct[]) => {
        setRowSelected(row);
    }, []);

    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <TopBar
                title="Sản phẩm"
                extra={
                    <Button className="gx-mb-0" type="primary">
                        Export
                    </Button>
                }
            />
            <Container>
                <CardComponent
                    title={<Segmented options={['Hà Nội', 'Vinh', 'Hồ Chí Minh']} />}
                    extra={<div>filter</div>}
                >
                    <TableComponent
                        loading={isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        onRowSelection={onRowSelection}
                        dataSource={product ? product.data : []}
                        columns={columnsProduct(page)}
                        total={product && product?.paging?.totalItemCount}
                    />
                    {/* <div>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="THÔNG TIN SẢN PHẨM" key="1">
                                <Card className="gx-mb-0">
                                    <Descriptions title="THÔNG TIN CHUNG" column={2}>
                                        <Descriptions.Item label="Mã sản phẩm">245512356</Descriptions.Item>
                                        <Descriptions.Item label="Danh mục">Con lăn sơn</Descriptions.Item>
                                        <Descriptions.Item label="Tên sản phẩm">Con lăn sơn</Descriptions.Item>
                                        <Descriptions.Item label="Trạng thái sản phẩm">
                                            Đang hoạt động
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Giá bán(VNĐ)">100000</Descriptions.Item>
                                        <Descriptions.Item label="Thuộc tính">Trắng</Descriptions.Item>
                                        <Descriptions.Item label="Loại hàng">Hàng bán chạy</Descriptions.Item>
                                        <Descriptions.Item label="Đơn vị tính(mặc đinh)">Cân</Descriptions.Item>
                                        <Descriptions.Item label="Tổng tồn">100</Descriptions.Item>
                                        <Descriptions.Item label="Đơn vị tính(quy đổi)">
                                            Nửa cân(giá trị quy đổi 0.5)
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Số khách hàng quan tâm">100</Descriptions.Item>
                                        <Descriptions.Item label="Mô tả">Con lăn sơn</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="DANH SÁCH ĐƠN HÀNG" key="2">
                                <TableComponent
                                    page={1}
                                    onChangePage={(_page) => console.log(_page)}
                                    columns={columsOderList}
                                    dataSource={dataSourceOderList}
                                    total={dataSourceOderList.length}
                                    onRowSelection={(row) => console.log('row', row)}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </div> */}
                </CardComponent>
            </Container>
        </>
    );
};
export default ProductPage;
