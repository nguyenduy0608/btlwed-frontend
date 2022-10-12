import TableComponent from '@/components/TableComponent';
import { Button, Card, Descriptions, Segmented } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { dataSourceProduct, dataSourceOderList, columsProduct, columsOderList } from '../components/Product.Config';
import { Tabs, Form } from 'antd';
import TopBar from '@/components/TopBar';
import CardComponent from '@/components/CardComponent';
import { PADDING } from '@/config/theme';

const ProductPage = () => {
    const [count, setCount] = React.useState(0);

    return (
        <Container>
            <TopBar
                title="Sản phẩm"
                extra={
                    <Button className="gx-mb-0" type="primary">
                        Export
                    </Button>
                }
            />
            <CardComponent title={<Segmented options={['Hà Nội', 'Vinh', 'Hồ Chí Minh']} />} extra="filter">
                <TableComponent
                    page={1}
                    onChangePage={(_page) => console.log(_page)}
                    columns={columsProduct}
                    dataSource={dataSourceProduct}
                    total={dataSourceProduct.length}
                    onRowSelection={(row) => console.log('row', row)}
                />
                <div>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="THÔNG TIN SẢN PHẨM" key="1">
                            <Card className="gx-mb-0">
                                <Descriptions title="THÔNG TIN CHUNG" column={2}>
                                    <Descriptions.Item label="Mã sản phẩm">245512356</Descriptions.Item>
                                    <Descriptions.Item label="Danh mục">Con lăn sơn</Descriptions.Item>
                                    <Descriptions.Item label="Tên sản phẩm">Con lăn sơn</Descriptions.Item>
                                    <Descriptions.Item label="Trạng thái sản phẩm">Đang hoạt động</Descriptions.Item>
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
                </div>
            </CardComponent>
        </Container>
    );
};

const Container = styled.div`
    padding: ${PADDING};
`;

export default ProductPage;
