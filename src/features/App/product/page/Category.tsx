import TableComponent from '@/components/TableComponent';
import { Card, Descriptions, Segmented } from 'antd';
import React from 'react';
import styled from 'styled-components';
import {  dataSourceCategoryHaNoi } from '../components/product.config';


const columsCategoryHanoi = [
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Danh mục con',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Thứ tự hiển thị',
        dataIndex: 'display',
        key: 'display',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createAt',
        key: 'createAt',
    },
];
const ProductCategoryPage = () => {
    const [count, setCount] = React.useState(0);

    return (
        <Card title="Danh mục sản phẩm" extra={<Segmented options={['Hà Nội', 'Vinh', 'Hồ Chí Minh']} />}>
            <TableComponent
                page={1}
                onChangePage={(_page) => console.log(_page)}
                onRowSelection={(row) => console.log(row)}
                expandedRowRender={(row: any) => (
                    <Card className="gx-mb-0">
                        <Descriptions title="Thông tin danh mục">
                            <Descriptions.Item label="Tên danh mục">
                                {dataSourceCategoryHaNoi[0].name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">Hoạt động</Descriptions.Item>
                            <Descriptions.Item label="Thứ tự hiển thị">1</Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">17/10</Descriptions.Item>
                        </Descriptions>
                    </Card>
                )}
                columns={columsCategoryHanoi}
                dataSource={dataSourceCategoryHaNoi}
                total={dataSourceCategoryHaNoi.length}
            />
        </Card>
    );
};

export default ProductCategoryPage;
