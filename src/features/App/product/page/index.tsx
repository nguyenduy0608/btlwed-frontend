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
                            Thông tin chung
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                            >
                                <Form.Item label="Mã sản phẩm">1234</Form.Item>
                                <Form.Item label="Danh mục"> Con lăn sơn</Form.Item>
                            </Form>
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
