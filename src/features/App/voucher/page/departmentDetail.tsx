import React, { useState } from 'react';

import { useQuery } from 'react-query';

import TopBar from '@/components/TopBar';
import axios from 'axios';
import LocalStorage from '@/apis/LocalStorage';
import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import { columns } from '../../customer/components/Employee.Config';
import { useNavigate, useParams } from 'react-router-dom';
const initialFilterQuery = {
    search: '',
    status: '',
    customerName: '',
    typeService: '',
    provinceId: '',
    districtId: '',
    form: '',
    vote: '',
    startDate: '',
    endDate: '',
};

const filterClear = {
    search: '',
    status: '',
    customerName: '',
    typeService: '',
    provinceId: '',
    districtId: '',
    form: '',
    vote: '',
};

const DepartmentDetail: React.FC<any> = () => {
    const [page, setPage] = React.useState(1);

    const { id } = useParams();
    console.log(id);
    const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const navigate = useNavigate();

    // const getInfor = async ()=>{
    //     const res = await axios.get(`http://26.75.181.165:8080/admin/getrollingupinf/${id}/${'5'}/${'2023'}`, {
    //         headers,
    //     });
    // }
    const {
        data: empDepartment,
        refetch,
        isRefetching,
    } = useQuery<any>(['employee', filterQuery], () =>
        axios.get(`http://26.75.181.165:8080/employee/employeesbelongingdepartment/${id}`, {
            ...filterQuery,
            headers,
        })
    );
    const data = empDepartment?.data;

    return (
        <>
            <TopBar back title={`Tổng nhân viên thuộc ${id}`} />
            <CardComponent>
                <div style={{ marginBottom: '16px' }}>Kết quả lọc: {empDepartment?.data.length} </div>

                <TableComponent
                    showTotalResult
                    loading={isRefetching}
                    page={page}
                    rowSelect={false}
                    onChangePage={(_page) => setPage(_page)}
                    dataSource={empDepartment ? empDepartment.data : []}
                    total={empDepartment && empDepartment?.paging?.totalItemCount}
                    columns={columns(page)}
                />
            </CardComponent>
        </>
    );
};

export default DepartmentDetail;
