import TableComponent from '@/components/TableComponent';
import { columnsProduct } from '@/features/App/product/components/Product.Config';
import React from 'react';
import { useQuery } from 'react-query';
import { settingService } from '../../service';

const ProductTab = ({ kiotvietId }: { kiotvietId: number }) => {
    const [filterQuery, setFilterQuery] = React.useState({});
    const [page, setPage] = React.useState(1);

    const {
        data: products,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery<any>(['settingProductService', page, filterQuery], () =>
        settingService.getProductByKiotViet(kiotvietId, { page, ...filterQuery })
    );

    return (
        <TableComponent
            loading={isLoading || isRefetching}
            page={page}
            // onRowClick={(record: { id: number }) => navigate(`${routerPage.product}/${record.id}`)}
            rowSelect={false}
            onChangePage={(_page) => setPage(_page)}
            dataSource={products ? products.data : []}
            columns={columnsProduct(page)}
            total={products?.paging?.totalItemCount || 0}
        />
    );
};

export default ProductTab;
