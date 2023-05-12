import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { routerPage } from '@/config/contants.routes';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { selectAll } from '@/service';
import { handleObjectEmpty, wait } from '@/utils';
import { Button, Input, Segmented, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Description from '../components/Description';
import Filter from '../components/Filter';
import { columns } from '../components/Voucher.Config';
import voucherService from '../service';
import { IFilter } from '../type';
import axios from 'axios';
import LocalStorage from '@/apis/LocalStorage';

const initialFilterQuery = {};

const DepartmentPage = () => {
    const { state } = useCallContext();
    const { Search } = Input;
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState<any>('');
    const [page, setPage] = React.useState(1);
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const {
        data: department,
        refetch,
        isRefetching,
    } = useQuery<any>(['department', page, filterQuery], () =>
        axios.get(`http://26.75.181.165:8080/department/alldepartments/${filterQuery}`, { headers })
    );
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    React.useEffect(() => {
        refetch();
    }, []);

    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery('');
            setPage(1);
            setLoadingClearFilter(false);
        });
    };
    const onSearch = (search: string) => {
        setFilterQuery(search);
        setPage(1);
    };
    return (
        <>
            <TopBar title="Phòng ban" />
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
                    <div style={{ marginBottom: '16px' }}>Kết quả lọc: {department?.data.length} </div>

                    <TableComponent
                        showTotalResult
                        loading={isRefetching}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        dataSource={department ? department.data : []}
                        onRowClick={(record: { name: string }) => navigate(`${routerPage.voucher}/${record.name}`)}
                        total={department && department?.paging?.totalItemCount}
                        columns={columns(page)}
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

export default DepartmentPage;
