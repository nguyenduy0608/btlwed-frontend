import TableComponent from '@/components/TableComponent';
import { Card, Descriptions, Segmented } from 'antd';
import React from 'react';
import styled from 'styled-components';

const dataSource = [
    {
        id: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        id: '2',
        name: 'John',
        age: 42,
        address: '112 Downing Street',
    },
];

const HomePage = () => {
    const [count, setCount] = React.useState(0);

    return (
        <Card title="Bảng sản phẩm" extra={<Segmented options={['Tất cả', 'Kho 1']} />}>
            <TableComponent
                page={1}
                onChangePage={(_page) => console.log(_page)}
                onRowSelection={(row) => console.log(row)}
                expandedRowRender={(row: any) => (
                    <Card className="gx-mb-0">
                        <Descriptions>
                            <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                            <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
                            <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                            <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                            <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                        </Descriptions>
                    </Card>
                )}
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Age',
                        dataIndex: 'age',
                        key: 'age',
                    },
                    {
                        title: 'Address',
                        dataIndex: 'address',
                        key: 'address',
                    },
                ]}
                dataSource={dataSource}
                total={dataSource.length}
            />
        </Card>
    );
};

export default HomePage;
