import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { Button, Form, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { columns, DataTypeAccount } from '../component/Account.Config';

import Description from '../component/Description';
import Filter from '../component/Filter';
import accountService from '../service';
import AccountFormPage from './form';
const initialFilterQuery = {};
const initialValue = {
    fullName: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    createdAt: '',
    updatedAt: '',
    password: '',
    accountId: '',
    passwordConfirmation: '',
};

const AccountPage = () => {
    const { state } = useCallContext();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeAccount[] | null>(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<DataTypeAccount | null>(null);

    const {
        data: account,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['account', page, filterQuery], () => accountService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypeAccount[]) => {
        setRowSelected(row);
    }, []);
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const handleShowModal = (record: DataTypeAccount) => {
        setValues(record);
        setModalVisible(true);
    };
    const handleCloseForm = React.useCallback((trick = '') => {
        setValues(null);
        setModalVisible(false);
        if (trick === 'notRefresh') return;
        refetch();
        formReset();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const rowRender = (record: DataTypeAccount, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description record={record} handleShowModal={() => handleShowModal(record)} refetch={refetch} />;
    };

    const returnFilter = React.useCallback(
        (filter: IFilter) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    return (
        <>
            <TopBar title="Tài khoản" />
            <Container>
                <CardComponent
                    title={<Filter returnFilter={returnFilter} key="filter" />}
                    extra={
                        <Space>
                            <Button
                                type="primary"
                                className="gx-mb-0"
                                onClick={() => {
                                    setModalVisible(true);
                                }}
                            >
                                Thêm mới
                            </Button>
                        </Space>
                    }
                >
                    <TableComponent
                        loading={isRefetching || loadingModal || isLoading}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
                        onRowSelection={onRowSelection}
                        dataSource={account ? account.data : []}
                        columns={columns(page)}
                        total={account && account?.paging?.totalItemCount}
                    />
                </CardComponent>
                <AccountFormPage modalVisible={modalVisible} values={values} handleCloseForm={handleCloseForm} />
            </Container>
        </>
    );
};

export default AccountPage;
