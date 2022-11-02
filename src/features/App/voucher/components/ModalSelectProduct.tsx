import ModalComponent from '@/components/ModalComponent';
import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import TableComponent from '@/components/TableComponent';
import { Button, Row, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { columnsApplyVoucher } from '../components/Voucher.Config';
import voucherService from '../service';

const ModalSelectProduct = ({
    open,
    setOpen,
    callbackChoseProduct,
    productsProps,
}: {
    open: boolean;
    setOpen: any;
    callbackChoseProduct: any;
    productsProps: any;
}) => {
    const [filterQuery, setFilterQuery] = React.useState({});
    const [page, setPage] = React.useState(1);

    const [productSelected, setProductSelected] = React.useState<any>({});

    const {
        data: products,
        isLoading,
        isRefetching,
    } = useQuery<any>(['voucherProductService', page, filterQuery], () =>
        voucherService.getProduct({ page, ...filterQuery })
    );

    const onRowSelection = React.useCallback(
        (row: any) => {
            setProductSelected((prev: any) => ({ ...prev, [page]: row }));
        },
        [page]
    );

    const handleSubmit = () => {
        callbackChoseProduct([...productsProps, ...Object.values(productSelected).flat()]);
        setOpen(false);
    };

    return (
        <ModalComponent width={1400} title="Chọn sản phẩm áp dụng" modalVisible={open}>
            <TableComponent
                // customRowKey={Object.values(productSelected)
                //     .flat()
                //     .map((item: any) => item?.id)}
                header={
                    <Row style={{ flexDirection: 'row', padding: '0 20px' }} justify="space-between" align="middle">
                        <h3 className="gx-m-0 gx-font-weight-medium">ÁP DỤNG CHO SẢN PHẨM</h3>
                        <Space>
                            <SearchInput
                                placeholderSearch="Nhập tên sản phẩm"
                                onChangeSearch={(value) => setFilterQuery({ search: value })}
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
                renderDefault={false}
                page={page}
                rowSelect
                rowClassName={(record: any) =>
                    productsProps.some((product: any) => product.id === record.id) ? 'disabled' : ''
                }
                onRowSelection={onRowSelection}
                total={products?.paging?.totalItemCount || 0}
                columns={columnsApplyVoucher(page)}
                dataSource={products ? products.data : []}
                onChangePage={(_page) => setPage(_page)}
            />
            <Row justify="end" className="gx-m-0">
                <Space>
                    <Button onClick={() => setOpen(false)}>Đóng</Button>
                    <Button type="primary" onClick={handleSubmit}>
                        Xác nhận
                    </Button>
                </Space>
            </Row>
        </ModalComponent>
    );
};

export default React.memo(ModalSelectProduct);
