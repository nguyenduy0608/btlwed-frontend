import React, { useEffect, useState } from 'react';

import { ClearOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Row, Space, message } from 'antd';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import TopBar from '@/components/TopBar';
import Topbar from '@/layout/Content/Topbar';
import axios from 'axios';
import LocalStorage from '@/apis/LocalStorage';
import Buttons from '../../voucher/components/Buttons';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import FormComponent from '@/components/FormComponent';
import SaveButton from '@/components/Button/Save.Button';
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
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const CalendarPage: React.FC<any> = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = LocalStorage.getToken();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    const {
        data: Infor,
        refetch,
        isRefetching,
    } = useQuery<any>(['employee'], () =>
        axios.get(`http://26.75.181.165:8080/employee/getrollingupinf/${5}/${'2023'}`, { headers })
    );

    React.useEffect(() => {
        if (Infor) {
            form.setFieldsValue({
                name: Infor?.data?.name,
                address: Infor?.data?.address,
                phoneNumber: Infor?.data?.phonenumber,
            });
        }
    }, [Infor]);

    const formReset = () => {
        form.setFieldsValue({
            name: Infor?.data?.name,
            address: Infor?.data?.address,
            phoneNumber: Infor?.data?.phonenumber,
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        formReset();
    };
    useEffect(() => {
        refetch();
    }, []);
    const requestData = {
        name: '',
    };
    const onSubmit = async (data: any) => {
        const dataForm = {
            address: data?.address,
            phoneNumber: data?.phoneNumber,
            name: data?.name?.trim(),
        };
        try {
            const res = await axios.post(`http://26.75.181.165:8080/employee/newemployee`, dataForm, {
                headers,
            });
            handleCancel();
            refetch();
            message.success('Cập nhật thông tin thành công');
        } catch (error) {
            console.error(error);
        }
    };
    const confirm = async (e: any) => {
        try {
            const res = await axios.post('http://26.75.181.165:8080/employee/rollingup', requestData, { headers });
            // handleCallBack();
            if (res?.data?.status === 'ok') message.success('Đã điểm danh thành công');
            else message.error('Hôm nay bạn đã điểm danh rồi');
            refetch();
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    const events = Infor?.data?.alldates?.map((item: any, index: number) => ({
        title: 'Đã điểm danh',
        id: item.id,
        date: item.date,
    }));

    const cancel = (e: any) => {};
    return (
        <>
            <TopBar
                title={<a onClick={() => setIsModalOpen(true)}>{Infor?.data?.name}</a>}
                extra={[
                    <Popconfirm
                        placement="topRight"
                        title="Bạn có chắc chắn muốn điểm danh?"
                        onConfirm={() => {
                            confirm('1');
                        }}
                        onCancel={cancel}
                        okText="Ok"
                        cancelText="Hủy"
                    >
                        <a
                            style={{
                                fontSize: '1.6rem',
                            }}
                            href=""
                        >
                            <Button type="primary">Điểm danh</Button>
                        </a>
                    </Popconfirm>,
                    <Button onClick={() => setIsModalOpen(true)} type="primary">
                        Sửa thông tin
                    </Button>,
                ]}
            />
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
            <Modal title="Sửa thông tin" open={isModalOpen} onCancel={handleCancel} footer={null} width="36%">
                <FormComponent
                    {...formItemLayout}
                    form={form}
                    onSubmit={(value: any) => {
                        onSubmit(value);
                    }}
                >
                    <Row gutter={[20, 0]}>
                        <FormItemComponent
                            title="name"
                            label="Họ và tên"
                            inputField={<Input placeholder="Nhập họ và tên" />}
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        />
                        <FormItemComponent
                            label="Số điện thoại"
                            title="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            inputField={<Input placeholder="Nhập số điện thoại" />}
                        />
                        <FormItemComponent
                            label="Địa chỉ"
                            title="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            inputField={<Input placeholder="Nhập địa chỉ" />}
                        />
                    </Row>

                    <Row style={{ width: '100%' }} align="bottom" justify="end">
                        <Space>
                            <Button type="default" onClick={handleCancel}>
                                Thoát
                            </Button>
                            <SaveButton htmlType="submit" />
                        </Space>
                    </Row>
                </FormComponent>
            </Modal>
        </>
    );
};

export default CalendarPage;
