import TableComponent from '@/components/TableComponent';
import { Card, Descriptions, Segmented } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { dataSourceProduct } from '../components/product.config';
import { Tabs, Form } from 'antd';
const columsProduct = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Mã sản phẩm',
        dataIndex: 'productId',
        key: 'productId',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Giá bán(VNĐ)',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },

    {
        title: 'Tổng tồn',
        dataIndex: 'total',
        key: 'total',
    },
];
const dataSourceOderList = [
    {
        id: '1',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duy',
        amount: 30,
        total: 2000000,
    },
    {
        id: '2',
        oderId: 'Pj1000',
        customerName: 'Nguyễn Đức Duyyyyy',
        amount: 30,
        total: 2000000,
    },
];
const columsOderList = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Mã đơn',
        dataIndex: 'oderId',
        key: 'Id',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Số lượng',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'total',
        key: 'total',
    },
];
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
