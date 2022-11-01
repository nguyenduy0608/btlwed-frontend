import TableComponent from '@/components/TableComponent';
import { Button, Row } from 'antd';
import React from 'react';
import { columnsApplyVoucherSelect } from '../components/Voucher.Config';
import ModalSelectProduct from './ModalSelectProduct';

const TableProduct = ({
    productSelected,
    products,
    setProducts,
}: {
    productSelected: any;
    products: any;
    setProducts: any;
}) => {
    const [openModal, setOpenModal] = React.useState(false);

    const callbackRemoveProduct = (productId: number) => {
        setProducts((prev: any) => prev.filter((item: any) => item.id !== productId));
    };

    return (
        <>
            <TableComponent
                rowSelect={false}
                customRowKey={productSelected}
                header={
                    <Row style={{ flexDirection: 'row', padding: '0 20px' }} justify="space-between" align="middle">
                        <h3 className="gx-m-0 gx-font-weight-medium">ÁP DỤNG CHO SẢN PHẨM</h3>
                        <Button onClick={() => setOpenModal(true)} type="primary">
                            Chọn sản phẩm
                        </Button>
                    </Row>
                }
                columns={columnsApplyVoucherSelect(callbackRemoveProduct)}
                dataSource={products}
            />
            <ModalSelectProduct
                callbackChoseProduct={(pros: any) => setProducts(pros)}
                setOpen={setOpenModal}
                open={openModal}
            />
        </>
    );
};

export default React.memo(TableProduct);
