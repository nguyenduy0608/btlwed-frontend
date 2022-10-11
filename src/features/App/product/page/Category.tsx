import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { PADDING } from '@/config/theme';
import { Card, Descriptions, Segmented } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { dataSourceCategoryHaNoi, columsCategoryHanoi } from '../components/Product.Config';

const ProductCategoryPage = () => {
    const [count, setCount] = React.useState(0);

    return (
        <Container>
            <TopBar title="Danh mục sản phẩm" />
            <CardComponent title={<Segmented options={['Hà Nội', 'Vinh', 'Hồ Chí Minh']} />} extra={<div>filter</div>}>
                <TableComponent
                    page={1}
                    rowSelect={false}
                    onChangePage={(_page) => console.log(_page)}
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
            </CardComponent>
        </Container>
    );
};

const Container = styled.div`
    padding: ${PADDING};
`;

export default ProductCategoryPage;
