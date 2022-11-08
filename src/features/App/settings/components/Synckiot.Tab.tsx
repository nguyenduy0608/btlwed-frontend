import TableComponent from '@/components/TableComponent';
import React from 'react';
import { columns } from '../../product/components/Product.Config';

const SynckiotTab = () => {
    return (
        <TableComponent
            // loading={isLoading}
            // page={page}
            rowSelect={false}
            // onChangePage={(_page) => setPage(_page)}
            // expandedRowRender={rowRender}
            // onRowSelection={onRowSelection}
            dataSource={[]}
            columns={columns(1)}
            total={0}
        />
    );
};

export default SynckiotTab;
