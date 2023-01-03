import CardComponent from '@/components/CardComponent';
import IconAntd from '@/components/IconAntd';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { selectAll } from '@/service';
import { Notification } from '@/utils';
import { Button, Form, Popconfirm, Row, Segmented, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { WarehouseColumns } from './Setting.Config';
import { WarehouseService } from '../service';
import WarehouseFormPage from './WarehouseForm';
const initialFilterQuery = {};
const initialValue = {};
const Warehouse = () => {
    const { state } = useCallContext();

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<any>(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<any>(null);
    const {
        data: warehouse,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['warehouseService', page, filterQuery], () => WarehouseService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: any) => {
        setRowSelected(row);
    }, []);

    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const handleShowModal = (record: any) => {
        setValues(record);
        setModalVisible(true);
    };
    const handleCloseForm = React.useCallback((trick = '') => {
        setValues(null);
        setModalVisible(false);
        if (trick === 'notRefresh') return;
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TableComponent
                loading={isRefetching}
                page={page}
                rowSelect={false}
                onChangePage={(_page) => setPage(_page)}
                onRowSelection={onRowSelection}
                dataSource={warehouse ? warehouse.data : []}
                columns={[
                    ...WarehouseColumns(page),
                    {
                        title: 'Thao tác',
                        dataIndex: 'action',
                        align: 'center',
                        width: 120,
                        render: (_, record: any) => (
                            <Row justify="center">
                                <Button
                                    icon={<IconAntd icon="EditOutlined" />}
                                    onClick={() => {
                                        handleShowModal(record);
                                    }}
                                />
                            </Row>
                        ),
                    },
                ]}
                total={warehouse?.paging?.totalItemCount || 0}
            />
            <WarehouseFormPage modalVisible={modalVisible} values={values} handleCloseForm={handleCloseForm} />
        </>
    );
};
export default Warehouse;
