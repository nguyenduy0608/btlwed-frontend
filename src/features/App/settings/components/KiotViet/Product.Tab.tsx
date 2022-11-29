import CardComponent from '@/components/CardComponent';
import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import TableComponent from '@/components/TableComponent';
import { routerPage } from '@/config/contants.routes';
import { DefaultSelectStyled } from '@/config/global.style';
import { columnsProduct } from '@/features/App/product/components/Product.Config';
import { Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { settingService } from '../../service';

const ProductTab = ({ kiotvietId }: { kiotvietId: number }) => {
    const [filterQuery, setFilterQuery] = React.useState({});
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();

    const {
        data: products,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery<any>(['settingProductService', page, filterQuery], () =>
        settingService.getProductByKiotViet(kiotvietId, { page, ...filterQuery })
    );

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    return (
        <CardComponent
            title={
                <div className="gx-pl-4" style={{ fontSize: '14px' }}>
                    Kết quả lọc: <strong>{products?.paging?.totalItemCount || 0}</strong>
                </div>
            }
            extra={[
                <Space className="gx-mr-4" size="middle" wrap>
                    <SearchInput
                        onChangeSearch={(search) => returnFilter({ search })}
                        placeholderSearch="Nhập mã, tên sản phẩm"
                    />
                    <SelectComponent
                        onChange={(item: any) => {
                            returnFilter({ category_id: item?.key || '' });
                        }}
                        apiUrl="/admin/product_category"
                        placeholder="Chọn danh mục"
                    />
                    <DefaultSelectStyled
                        placeholder="Trạng thái"
                        allowClear
                        style={{ width: '200px' }}
                        defaultValue={null}
                        onChange={(value) => returnFilter({ status: value })}
                    >
                        <DefaultSelectStyled.Option value={1}>Đang hoạt động</DefaultSelectStyled.Option>
                        <DefaultSelectStyled.Option value={0}>Ngừng hoạt động</DefaultSelectStyled.Option>
                    </DefaultSelectStyled>
                </Space>,
            ]}
        >
            <TableComponent
                loading={isLoading || isRefetching}
                page={page}
                onRowClick={(record: { id: number }) => navigate(`${routerPage.product}/${record.id}`)}
                rowSelect={false}
                onChangePage={(_page) => setPage(_page)}
                dataSource={products ? products.data : []}
                columns={columnsProduct(page)}
                total={products?.paging?.totalItemCount || 0}
            />
        </CardComponent>
    );
};

export default ProductTab;
