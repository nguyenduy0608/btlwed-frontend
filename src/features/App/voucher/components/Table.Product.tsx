import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import TableComponent from '@/components/TableComponent';
import { Row, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { ProductService } from '../../product/service';
import { columnsApplyVoucher, dataSourceApplyVoucher } from '../components/Voucher.Config';

const TableProduct = () => {
    const [filterQuery, setFilterQuery] = React.useState({});
    const [page, setPage] = React.useState(1);
    const {
        data: products,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['ProductService', page, filterQuery], () => ProductService.get({ page, ...filterQuery }));

    return (
        <TableComponent
            header={
                <Row style={{ flexDirection: 'row' }} justify="space-between" align="middle">
                    <h3 className="gx-m-0 gx-font-weight-medium">ÁP DỤNG CHO TẤT CẢ SẢN PHẨM</h3>
                    <Space>
                        <SearchInput
                            placeholderSearch="Nhập tên sản phẩm"
                            onChangeSearch={() => console.log('first')}
                        />
                        <SelectComponent
                            onChange={(item: any) => {
                                setFilterQuery({ category_id: item?.key || '' });
                            }}
                            apiUrl="/admin/product_category"
                            placeholder="Chọn danh mục"
                        />
                    </Space>
                </Row>
            }
            loading={isRefetching}
            page={page}
            rowSelect={false}
            // onRowSelection={onRowSelection}
            total={products?.paging?.totalItemCount || 0}
            columns={columnsApplyVoucher(page)}
            dataSource={products ? products.data : []}
            onChangePage={(_page) => setPage(_page)}
        />
    );
};

export default TableProduct;
