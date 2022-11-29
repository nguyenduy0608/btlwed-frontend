import CardComponent from '@/components/CardComponent';
import RangerPicker from '@/components/RangerPicker';
import TableComponent from '@/components/TableComponent';
import { routerPage } from '@/config/contants.routes';
import { Form } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { PurchaseService } from '../service';
import { Purchasecolumns } from './Customer.Config';
const initialFilterQuery = {};

const PuchaseHistoryPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [form] = Form.useForm();

    const { data: puchaseHistory, isLoading } = useQuery<any>(['PurchaseService', page, filterQuery], () =>
        PurchaseService.get({ page, ...filterQuery })
    );

    const returnFilter = React.useCallback(
        (filter: IFilter) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    return (
        <CardComponent
            title={<div className="gx-pl-4">Lịch sử mua hàng</div>}
            extra={[
                <div key="filter" className="gx-mr-4">
                    <RangerPicker
                        name="dateFilter"
                        onChange={(name: string, value: string) => {
                            returnFilter({ createFrom: value.split(',')[0], createTo: value.split(',')[1] });
                        }}
                    />
                </div>,
            ]}
        >
            <TableComponent
                page={page}
                loading={isLoading}
                rowSelect={false}
                onRowClick={(record: { id: number }) => navigate(`${routerPage.order}/${record.id}`)}
                onChangePage={(_page) => setPage(_page)}
                dataSource={puchaseHistory ? puchaseHistory.data : []}
                columns={Purchasecolumns(page)}
                total={puchaseHistory && puchaseHistory?.paging?.totalItemCount}
            />
        </CardComponent>
    );
};

export default PuchaseHistoryPage;
