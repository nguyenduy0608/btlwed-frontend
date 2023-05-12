import React, { useState } from 'react';

import { ClearOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TopBar from '@/components/TopBar';
import Topbar from '@/layout/Content/Topbar';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import LocalStorage from '@/apis/LocalStorage';
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

const EmployeeDetail: React.FC<any> = () => {
    const { id } = useParams();
    const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const navigate = useNavigate();
    const {
        data: employee,
        refetch,
        isRefetching,
    } = useQuery<any>(['employee', filterQuery], () =>
        axios.get(`http://26.75.181.165:8080/employee/${id}`, { ...filterQuery, headers })
    );
    const data = employee?.data;
    const { data: rolling } = useQuery<any>(['rolling', id], () =>
        axios.get(`http://26.75.181.165:8080/admin/getrollingupinf/${id}/${5}/${'2023'}`, { headers })
    );
    const confirm = async (record: any) => {
        const res = await axios.delete(`http://26.75.181.165:8080/employee/${record}`, { headers });
        message.success('Đã xóa nhân viên thành công');
        refetch();
        navigate('/employee');
    };
    const events = rolling?.data?.alldates?.map((item: any, index: number) => ({
        title: 'Đã điểm danh',
        id: item.id,
        date: item.date,
    }));

    const cancel = (e: any) => {};
    return (
        <>
            <TopBar
                back
                title={data?.name}
                extra={[
                    <Popconfirm
                        placement="topRight"
                        title="Bạn có chắc chắn muốn xóa nhân viên này?"
                        onConfirm={() => {
                            confirm(id);
                        }}
                        onCancel={() => {}}
                        okText="Ok"
                        cancelText="Hủy"
                    >
                        <a
                            style={{
                                fontSize: '1.6rem',
                            }}
                            href=""
                        >
                            Xóa nhân viên
                            <DeleteOutlined />
                        </a>
                    </Popconfirm>,
                ]}
            />
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
        </>
    );
};

export default EmployeeDetail;
