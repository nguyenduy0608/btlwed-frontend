import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import ModalComponent from '@/components/ModalComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Notification, wait } from '@/utils';
import { Button, Form, InputNumber, Row, Segmented, Space } from 'antd';
import Input from 'antd/lib/input/Input';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { rules } from '../../voucher/rules';
import { columns, DataTypeOrder } from '../components/Order.Config';
import { OrderService } from '../service';
import Filter from '../components/FIlter';
import useCallContext from '@/hooks/useCallContext';
import { selectAll } from '@/service';
import ExportButton from '@/components/Button/Export.Button';
import { routerPage } from '@/config/routes';
import PrintButton from '@/components/Button/Print.Button';
const initialFilterQuery = {};

const initialValue = {
    name: '',
    order: '',
};

const OrderPage = () => {
    const { state, dispatch } = useCallContext();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [values, setValues] = React.useState<DataTypeOrder | null>(null);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeOrder[] | []>([]);
    const [form] = Form.useForm();

    const {
        data: order,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['OrderService', page, filterQuery], () => OrderService.get({ page, ...filterQuery }));

    React.useEffect(() => {
        refetch();
    }, [state.syncLoading]);

    const onRowSelection = React.useCallback((row: DataTypeOrder[]) => {
        setRowSelected(row);
    }, []);

    const returnFilter = React.useCallback((filter: any) => {
        setPage(1);
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <TopBar
                title="Đơn hàng"
                extra={
                    <Segmented
                        onChange={(value) => setFilterQuery({ ...filterQuery, kiotvietId: value })}
                        options={[
                            selectAll,
                            ...((state?.kiotviets?.map((kiot) => ({ label: kiot.name, value: kiot.id })) || []) as any),
                        ]}
                    />
                }
            />
            <Container>
                <CardComponent
                    title={<Filter returnFilter={returnFilter} key="filter" />}
                    extra={[<PrintButton onClick={() => {}} />, <ExportButton onClick={() => console.log('first')} />]}
                >
                    <TableComponent
                        loading={isRefetching || loadingModal || isLoading}
                        page={page}
                        rowSelect={false}
                        onRowClick={(record: { id: number }) => navigate(`${routerPage.order}/${record.id}`)}
                        onChangePage={(_page) => setPage(_page)}
                        onRowSelection={onRowSelection}
                        dataSource={order?.data}
                        columns={columns(page)}
                        total={order && order?.paging?.totalItemCount}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default OrderPage;
