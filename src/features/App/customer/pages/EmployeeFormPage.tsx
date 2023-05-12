import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Modal, Row, Select, Space, Spin, message } from 'antd';
import styled from 'styled-components';
import { Rule } from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { DataTypeEmployee } from '../components/Employee.Config';
import FormComponent from '@/components/FormComponent';
import SaveButton from '@/components/Button/Save.Button';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import LocalStorage from '@/apis/LocalStorage';
const REG_PHONE = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
const MOBI = /((^(\+84|84|0|0084){1})(3)(2|3|4|5|6|7|8|9))+([0-9]{7})$/;
const VINA = /((^(\+84|84|0|0084){1})(8)(2|3|4|5|6|8|9))+([0-9]{7})$/;
const VIETTEL = /((^(\+84|84|0|0084){1})(9)(3|4|1|6|7|8|9|0))+([0-9]{7})$/;
const SEVEN = /((^(\+84|84|0|0084){1})(7)(0|6|7|8|9))+([0-9]{7})$/;
const FIVE = /((^(\+84|84|0|0084){1})(5)(9))+([0-9]{7})$/;

const Option = Select;
const initialValue = {
    phoneNumber: '',
    password: '',
    username: '',
    address: '',
    createdAt: '',
    name: '',
    salary: '',
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

const EmployeeFormPage = ({
    handleCancel,
    open,
    values,
    refetch,
}: {
    handleLoading?: any;
    handleUnLoading?: any;
    handleCancel?: any;
    handleOk?: any;
    refetch?: any;
    open?: any;
    values?: DataTypeEmployee | any;
}) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (values) {
            form.setFieldsValue({ ...values });
        }
    }, [values]);
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const onSubmit = async (data: DataTypeEmployee) => {
        if (!values) {
            const dataForm = {
                address: data?.address,
                password: data?.password,
                createdAt: data?.createdAt?.trim(),
                phoneNumber: data?.phoneNumber,
                name: data?.name?.trim(),
                status: 'ok',
                salary: data?.salary,
                username: data?.username?.trim(),
            };
            try {
                const res = await axios.put('http://26.75.181.165:8080/admin/newemployee', dataForm, { headers });
                onCancel();
                refetch();

                message.success('Thêm mới nhân viên thành công');
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
                onSubmit={(value: DataTypeEmployee) => {
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
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại' },
                            {
                                validator(_: Rule, value: number) {
                                    if (!value?.toString()?.trim()) return Promise.resolve();
                                    if (
                                        (!value?.toString()?.match(SEVEN) &&
                                            !value?.toString()?.match(MOBI) &&
                                            !value?.toString()?.match(VIETTEL) &&
                                            !value?.toString()?.match(VINA) &&
                                            !value?.toString()?.match(FIVE)) ||
                                        isNaN(Number(value))
                                    ) {
                                        return Promise.reject(new Error('Vui lòng nhập đúng định dạng số điện thoại!'));
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                        inputField={<Input placeholder="Nhập số điện thoại" />}
                    />

                    <FormItemComponent
                        label="Địa chỉ"
                        title="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        inputField={<Input placeholder="Nhập địa chỉ" />}
                    />
                    <FormItemComponent
                        label="Mức lương"
                        title="salary"
                        rules={[{ required: true, message: 'Vui lòng nhập mức lương' }]}
                        inputField={<Input placeholder="Nhập mức lương" />}
                    />
                    <FormItemComponent
                        title="username"
                        label="Tên tài khoản"
                        inputField={<Input placeholder="Nhập tài khoản nhân viên" />}
                        rules={[{ required: true, message: 'Vui lòng nhập tài khoản nhân viên' }]}
                    />
                    <FormItemComponent
                        label="Mật khẩu"
                        title="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        inputField={<Input.Password placeholder="******" disabled={values} />}
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

export default EmployeeFormPage;
