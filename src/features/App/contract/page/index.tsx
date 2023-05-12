import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import useCallContext from '@/hooks/useCallContext';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Container from '@/layout/Container';
import { downloadFile, handleObjectEmpty, wait, Notification } from '@/utils';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { IFilter } from '../../voucher/type';
import axios from 'axios';
import Buttons from '../../voucher/components/Buttons';
import { Button, Form, Input, Popconfirm, Space, message } from 'antd';
import useDebounce from '@/hooks/useDebounce';
import LocalStorage from '@/apis/LocalStorage';
import { DataTypeContract, columns } from '../components/Contract.Config';
import Description from '../../customer/components/Description';
import Filter from '../components/FIlter';
import ContractForm from './ContractForm';

const initialFilterQuery = '';

const EmployeePage = () => {
    const { Search } = Input;
    const { state } = useCallContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [callBack, setCallBack] = useState(false);
    const [values, setValues] = useState<DataTypeContract | null>();
    const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const {
        data: contract,
        refetch,
        isRefetching,
    } = useQuery<any>(['contract', page, filterQuery], () =>
        axios.get(`http://26.75.181.165:8080/contract/allcontracts/${filterQuery}`, { page, ...filterQuery, headers })
    );
    const initialValue = {
        position: '',
        note: '',
        description: '',
        idemp: '',
        departmentname: '',
        time: '',
    };
    const [form] = Form.useForm();

    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);
    React.useEffect(() => {
        refetch();
    }, [state.syncLoading]);

    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery('');
            setPage(1);
            setLoadingClearFilter(false);
        });
    };
    const handleCallBack = () => {
        setCallBack(!callBack);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const handleCancel = () => {
        setValues(null);
        setIsModalOpen(false);
        formReset();
    };
    const onSearch = (search: string) => {
        setFilterQuery(search);
        setPage(1);
    };
    return (
        <>
            <TopBar
                title="Danh sách hợp đồng"
                extra={[
                    loadingClearFilter ? <ClearFilterLoading key="clear_filter" /> : <></>,
                    <Button
                        key="add_contract"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        className="gx-mb-0"
                        type="primary"
                    >
                        Thêm mới
                    </Button>,
                ]}
            />
            <Container>
                <CardComponent
                    title={
                        loadingClearFilter ? (
                            <ClearFilterLoading key="clear_filter" />
                        ) : (
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
                        )
                    }
                >
                    <TableComponent
                        reLoadData={() => refetch()}
                        showTotalResult
                        loading={isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        dataSource={contract ? contract.data : []}
                        columns={[...columns(page)]}
                        total={contract && contract?.paging?.totalItemCount}
                    />
                    <ContractForm
                        handleCallBack={handleCallBack}
                        values={values}
                        handleCancel={handleCancel}
                        handleOk={handleOk}
                        open={isModalOpen}
                        refetch={refetch}
                    />
                </CardComponent>
            </Container>
            <ClearFilter
                hidden={
                    Object.values(handleObjectEmpty(filterQuery))?.filter(
                        (item: any) => item !== undefined && item !== ''
                    ).length > 0
                }
                onClick={onClearFilter}
            />
        </>
    );
};

export default EmployeePage;
