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
import { columns, DataTypeEmployee } from '../components/Employee.Config';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { CustomerService } from '../service';
import axios from 'axios';
import Buttons from '../../voucher/components/Buttons';
import { Button, Form, Input, Popconfirm, Space, message } from 'antd';
import EmployeeFormPage from './EmployeeFormPage';
import useDebounce from '@/hooks/useDebounce';
import LocalStorage from '@/apis/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { routerPage } from '@/config/contants.routes';

const initialFilterQuery = {};

const EmployeePage = () => {
    const { Search } = Input;
    const navigate = useNavigate();
    const { state } = useCallContext();
    const [callBack, setCallBack] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [values, setValues] = useState<DataTypeEmployee | null>();
    const [filterQuery, setFilterQuery] = React.useState<any>('');
    const [page, setPage] = React.useState(1);
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const {
        data: employee,
        refetch,
        isRefetching,
    } = useQuery<any>(['employee', page, filterQuery], () =>
        axios.get(`http://26.75.181.165:8080/employee/allemployees/${filterQuery}`, { headers })
    );

    const initialValue = {
        name: '',
        username: '',
        salary: '',
        email: '',
        avatar: '',
        phoneNumber: '',
        password: '',
    };
    const [form] = Form.useForm();

    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);
    React.useEffect(() => {
        refetch();
    }, [state.syncLoading]);
    const onSearch = (search: string) => {
        setFilterQuery(search);
        setPage(1);
    };
    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery('');
            setPage(1);
            setLoadingClearFilter(false);
        });
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

    return (
        <>
            <TopBar
                title="Danh sách nhân viên"
                extra={[
                    loadingClearFilter ? <ClearFilterLoading key="clear_filter" /> : <></>,
                    <Button
                        key="add_employee"
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
                        dataSource={employee ? employee.data : []}
                        onRowClick={(record: { id: number }) => navigate(`${routerPage.employee}/${record.id}`)}
                        columns={[...columns(page)]}
                        total={employee && employee?.paging?.totalItemCount}
                    />
                    <EmployeeFormPage
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
