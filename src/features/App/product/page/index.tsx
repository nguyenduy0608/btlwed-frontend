import TableComponent from '@/components/TableComponent';
import { Card, Descriptions, Segmented } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { dataSourceProduct, dataSourceOderList, columsProduct, columsOderList } from '../components/Product.Config';
import { Tabs, Form } from 'antd';



const ProductPage = () => {
    const [count, setCount] = React.useState(0);

    return (
        <Card title="Sản phẩm" extra={<Segmented options={['Hà Nội', 'Vinh', 'Hồ Chí Minh']} />}>
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
        </Card>
    );
};

export default ProductPage;
