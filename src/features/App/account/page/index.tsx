import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { columns, DataTypeAccount } from '../component/Account.Config';

import Description from '../component/Description';
import Filter from '../component/Filter';
import accountService from '../service';
import AccountFormPage from './form';
import axios from 'axios';
import LocalStorage from '@/apis/LocalStorage';
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
    role: '',
    passwordConfirmation: '',
};

const AccountPage = () => {
    const { state } = useCallContext();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Search } = Input;
    const [filterQuery, setFilterQuery] = React.useState('');
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeAccount[] | null>(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<DataTypeAccount | null>(null);
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const {
        data: account,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['account', page, filterQuery], () =>
        axios.get(`http://26.75.181.165:8080/admin/alladmins/${filterQuery}`, { headers })
    );
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
    const onSearch = (search: string) => {
        setFilterQuery(search);
        setPage(1);
    };

    return (
        <>
            <TopBar
                extra={
                    <Button
                        key="add"
                        type="primary"
                        className="gx-mb-0"
                        onClick={() => {
                            setModalVisible(true);
                        }}
                    >
                        Thêm mới
                    </Button>
                }
                title="Tài khoản"
            />

            <Container>
                <CardComponent
                    title={
                        <Space>
                            <Search
                                size="large"
                                placeholder="Nhập tên hoặc số điện thoại tài khoản"
                                onChange={(e: any) => {
                                    onSearch(e?.target?.value);
                                }}
                                style={{ width: 400 }}
                            />
                        </Space>
                    }
                >
                    <div style={{ marginBottom: '16px' }}>Kết quả lọc: {account?.data.length} </div>
                    <TableComponent
                        showTotalResult
                        loading={isRefetching || loadingModal}
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
