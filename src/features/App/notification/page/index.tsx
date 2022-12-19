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
import Filter from '../components/Filter';
import { columns, DataTypeNotification } from '../components/Notification.Config';
import { NotificationService } from '../service';
import NotificationFormPage from './form';
const initialFilterQuery = {};
const initialValue = {};
const NotificationPage = () => {
    const { state } = useCallContext();

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeNotification[] | null>(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<DataTypeNotification | null>(null);
    const {
        data: notification,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['notificationService', page, filterQuery], () =>
        NotificationService.get({ page, ...filterQuery })
    );

    const onRowSelection = React.useCallback((row: DataTypeNotification[]) => {
        setRowSelected(row);
    }, []);

    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const handleShowModal = (record: DataTypeNotification) => {
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
    const returnFilter = React.useCallback(
        (filter: IFilter) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    return (
        <>
            <TopBar title="Thông báo" />
            <Container>
                <CardComponent
                    title={<Filter returnFilter={returnFilter} key="filterNotification" />}
                    extra={
                        <Button onClick={() => setModalVisible(true)} className="gx-mb-0" type="primary">
                            Thêm mới
                        </Button>
                    }
                >
                    <TableComponent
                        loading={isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        onRowSelection={onRowSelection}
                        dataSource={notification ? notification.data : []}
                        columns={[
                            ...columns(page),
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
                                        <Popconfirm
                                            onConfirm={() => {
                                                NotificationService.delete(record.id).then(() => {
                                                    refetch();
                                                    Notification('success', 'Xoá thành công thông báo');
                                                });
                                            }}
                                            title="Bạn có chắc chắn muốn xoá?"
                                        >
                                            <Button icon={<IconAntd icon="DeleteOutlined" />} />
                                        </Popconfirm>
                                    </Row>
                                ),
                            },
                        ]}
                        total={notification?.paging?.totalItemCount || 0}
                    />
                    <NotificationFormPage
                        modalVisible={modalVisible}
                        values={values}
                        handleCloseForm={handleCloseForm}
                    />
                </CardComponent>
            </Container>
        </>
    );
};
export default NotificationPage;
