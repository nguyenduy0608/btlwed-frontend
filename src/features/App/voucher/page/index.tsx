import CardComponent from '@/components/CardComponent';
import React, { ReactNode, useState } from 'react';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/routes';
import { PADDING } from '@/config/theme';
import Container from '@/layout/Container';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { columns, DataTypeVoucher } from '../components/Voucher.Config';
import voucherService from '../service';
import { useQuery } from 'react-query';
const initialFilterQuery = {};
const VoucherPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const [rowSelected, setRowSelected] = React.useState<DataTypeVoucher[] | []>([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<DataTypeVoucher | null>(null);

    const rowRender = (record: any, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description record  ={record}/>;
    };
    const {
        data: voucher,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['voucherService', page, search, filterQuery], () =>
        voucherService.get({ page, search, ...filterQuery })
    );
    const onRowSelection = React.useCallback((row: DataTypeVoucher[]) => {
        setRowSelected(row);
    }, []);
    return (
        <>
            <TopBar
                title="Quản lý voucher"
                extra={
                    <Button onClick={() => navigate(routerPage.voucherForm)} className="gx-mb-0" type="primary">
                        Thêm mới
                    </Button>
                }
            />
            <Container>
                <CardComponent title="" extra={[<Filter />]}>
                    <TableComponent
                        loading={isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => console.log(_page)}
                        expandedRowRender={rowRender}
                        onRowSelection={onRowSelection}
                        dataSource={voucher ? voucher.data : []}
                        columns={columns(page)}
                        total={voucher && voucher?.paging?.totalItemCount - 1}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default VoucherPage;
