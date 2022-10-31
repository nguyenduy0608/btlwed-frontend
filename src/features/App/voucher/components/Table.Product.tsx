import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import TableComponent from '@/components/TableComponent';
import { Row, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { columnsApplyVoucher } from '../components/Voucher.Config';
import voucherService from '../service';

const TableProduct = ({
    productSelected,
    handleCallbackProductSelected,
}: {
    productSelected: any;
    handleCallbackProductSelected: any;
}) => {
    const [filterQuery, setFilterQuery] = React.useState({});
    const [page, setPage] = React.useState(1);

    const [rowSelected, setRowSelected] = React.useState<any>({});

    const {
        data: products,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['voucherProductService', page, filterQuery], () =>
        voucherService.getProduct({ page, ...filterQuery })
    );

    const onRowSelection = React.useCallback(
        (row: any) => {
            setRowSelected((prev: any) => ({ ...prev, [page]: row }));
            handleCallbackProductSelected(
                Object.values({ ...rowSelected, [page]: row })
                    .flat()
                    .map((item: any) => ({ id: item.id }))
            );
        },
        [page]
    );

    return (
        <TableComponent
            customRowKey={productSelected}
            header={
                <Row style={{ flexDirection: 'row', padding: '0 20px' }} justify="space-between" align="middle">
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
            rowSelect
            onRowSelection={onRowSelection}
            total={products?.paging?.totalItemCount || 0}
            columns={columnsApplyVoucher(page)}
            dataSource={products ? products.data : []}
            onChangePage={(_page) => setPage(_page)}
        />
    );
};

export default React.memo(TableProduct);
