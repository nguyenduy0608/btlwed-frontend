import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Modal, Row, Select, Space, Spin, message } from 'antd';
import styled from 'styled-components';
import { Rule } from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import FormComponent from '@/components/FormComponent';
import SaveButton from '@/components/Button/Save.Button';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import LocalStorage from '@/apis/LocalStorage';
import { DataTypeContract } from '../components/Contract.Config';
import { ok } from 'assert';
const REG_PHONE = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
const MOBI = /((^(\+84|84|0|0084){1})(3)(2|3|4|5|6|7|8|9))+([0-9]{7})$/;
const VINA = /((^(\+84|84|0|0084){1})(8)(2|3|4|5|6|8|9))+([0-9]{7})$/;
const VIETTEL = /((^(\+84|84|0|0084){1})(9)(3|4|1|6|7|8|9|0))+([0-9]{7})$/;
const SEVEN = /((^(\+84|84|0|0084){1})(7)(0|6|7|8|9))+([0-9]{7})$/;
const FIVE = /((^(\+84|84|0|0084){1})(5)(9))+([0-9]{7})$/;

const Option = Select;
const initialValue = {
    position: '',
    note: '',
    description: '',
    idemp: '',
    departmentname: '',
    time: '',
};
const token = LocalStorage.getToken();
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
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

const ContractForm = ({
    handleCancel,
    open,
    values,
    handleCallBack,
    refetch,
}: {
    handleLoading?: any;
    handleUnLoading?: any;
    handleCallBack?: any;
    handleCancel?: any;
    handleOk?: any;
    refetch?: any;
    open?: any;
    values?: DataTypeContract | any;
}) => {
    const [form] = Form.useForm();
    const [idemp, setIdemp] = useState([]);
    const [idDepartment, setIdDepartment] = useState([]);
    useEffect(() => {
        getDepartment();
        getId();
    }, []);
    React.useEffect(() => {
        if (values) {
            form.setFieldsValue({ ...values });
        }
    }, [values]);
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const getId = async () => {
        const res: any = await axios.get('http://26.75.181.165:8080/employee/allemployees', { headers });
        const id = res.data.map((item: any) => item.id);
        setIdemp(id);
        console.log(id);
    };
    const getDepartment = async () => {
        const res: any = await axios.get('http://26.75.181.165:8080/department/alldepartments', { headers });
        const id = res.data.map((item: any) => item.name);
        setIdDepartment(id);
        console.log(id);
    };
    const onSubmit = async (data: DataTypeContract) => {
        if (values) {
            const dataForm = {
                address: data?.address,
                phoneNumber: data?.phoneNumber,
                name: data?.name?.trim(),
            };
            try {
                const res = await axios.put(`http://26.75.181.165:8080/employee/newemployee/${values?.id}`, dataForm, {
                    headers,
                });
                onCancel();
                handleCallBack();
                refetch();
                message.success('Cập nhật nhân viên thành công');
            } catch (error) {
                console.error(error);
            }
        } else {
            const dataForm = {
                position: data.position,
                description: data?.description,
                note: data?.note,
                status: 'ok',
            };
            try {
                const res = await axios.put(
                    `http://26.75.181.165:8080/admin/newcontract/${data?.departmentname}/${data?.time}/${data?.idemp}`,
                    dataForm,
                    {
                        headers,
                    }
                );
                onCancel();
                refetch();
                handleCallBack();

                message.success('Thêm mới hợp đồng thành công');
            } catch (error) {
                console.log(error);
            }
        }
    };
    const onCancel = () => {
        handleCancel();
        formReset();
    };
    return (
        <Modal
            title={values ? 'Sửa nhân viên' : 'Thêm nhân viên'}
            open={open}
            onCancel={handleCancel}
            footer={null}
            width="36%"
        >
            <FormComponent
                {...formItemLayout}
                form={form}
                onSubmit={(value: DataTypeContract) => {
                    onSubmit(value);
                }}
            >
                <Row gutter={[20, 0]}>
                    <FormItemComponent
                        title="idemp"
                        label="Mã nhân viên"
                        inputField={
                            <Select placeholder="Chọn mã nhân viên">
                                {idemp.map((word, index) => (
                                    <Option key={index} value={word}>
                                        {word}
                                    </Option>
                                ))}
                            </Select>
                        }
                        rules={[{ required: true, message: 'Vui lòng chọn mã nhân viên' }]}
                    />
                    <FormItemComponent
                        title="departmentname"
                        label="Phòng ban"
                        inputField={
                            <Select placeholder="Chọn phòng ban">
                                {idDepartment.map((word, index) => (
                                    <Option key={index} value={word}>
                                        {word}
                                    </Option>
                                ))}
                            </Select>
                        }
                        rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]}
                    />

                    <FormItemComponent
                        label="Thời hạn"
                        title="time"
                        rules={[{ required: true, message: 'Vui lòng nhập thời hạn' }]}
                        inputField={<Input placeholder="Nhập thời hạn hợp đồng" />}
                    />

                    <FormItemComponent
                        label="Vị trí"
                        title="position"
                        rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}
                        inputField={<Input placeholder="Nhập vị trí" />}
                    />
                    <FormItemComponent
                        title="description"
                        label="Mô tả"
                        inputField={<Input.TextArea rows={4} placeholder="Nhập mô tả" />}
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    />
                    <FormItemComponent
                        label="Ghi chú"
                        title="note"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        inputField={<Input.TextArea rows={4} placeholder="Nhập ghi chú" />}
                    />
                </Row>

                <Row style={{ width: '100%' }} align="bottom" justify="end">
                    <Space>
                        <Button type="default" onClick={onCancel}>
                            Thoát
                        </Button>
                        <SaveButton htmlType="submit" />
                    </Space>
                </Row>
            </FormComponent>
        </Modal>
    );
};

export default ContractForm;
