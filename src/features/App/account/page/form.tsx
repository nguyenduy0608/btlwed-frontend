import SaveButton from '@/components/Button/Save.Button';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import ModalComponent from '@/components/ModalComponent';
import UploadComponent from '@/components/Upload';
import { ADMIN, STATUS } from '@/contants';
import useCallContext from '@/hooks/useCallContext';
import { Notification, uuid, wait } from '@/utils';
import { errorConfirmPassword, errorValidPhone, errorWhiteSpace } from '@/utils/validation';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
import { rules } from '../../voucher/rules';
import { DataTypeAccount } from '../component/Account.Config';
import accountService from '../service';
import axios from 'axios';
import LocalStorage from '@/apis/LocalStorage';
const { Option } = Select;

const initialValue = {
    name: '',
    email: '',
    role: '',
    address: '',
    username: '',
    password: '',
    phoneNumber: '',
    department: '',
};
const token = LocalStorage.getToken();
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};
const AccountFormPage = ({
    values,
    modalVisible,
    handleCloseForm,
}: {
    values?: DataTypeAccount | null;
    modalVisible: boolean;
    handleCloseForm: any;
}) => {
    const { state } = useCallContext();
    const [form] = Form.useForm();
    const [file, setFile] = React.useState<any>(null);
    const [loadingModal, setLoadingModal] = React.useState(false);

    const group = Form.useWatch('group', form);

    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    React.useEffect(() => {
        if (values) {
            setLoadingModal(true);
            form.setFieldsValue({ ...values });
            wait(500).then(() => setLoadingModal(false));
        }
    }, [values]);
    const handleSubmit = React.useCallback(
        async (data: DataTypeAccount) => {
            setLoadingModal(true);
            if (values) {
                const res = await axios.post(
                    `http://26.75.181.165:8080/admin/newadmin/${data.department || 'test'} `,
                    {
                        name: data.name?.trim(),
                        address: data.address?.trim(),
                        phoneNumber: data.phoneNumber,
                        status: data.status,
                        id: values?.id,
                    },
                    { headers }
                );
                if (res.status) {
                    Notification('success', 'Cập nhật tài khoản thành công');
                    handleCloseForm();
                    formReset();
                }
            } else {
                const dataForm = {
                    name: data.name?.trim(),
                    email: data.address?.trim(),
                    role: 'admin',
                    address: data?.address,
                    username: data?.username,
                    password: data?.password,
                    status: 'active',
                    phoneNumber: data?.phoneNumber,
                };
                const res = await axios.put(`http://26.75.181.165:8080/admin/newadmin/${data?.department}`, dataForm, {
                    headers,
                });
                if (res.status) {
                    Notification('success', 'Thêm tài khoản thành công');
                    handleCloseForm();
                    formReset();
                }
            }
            setLoadingModal(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [values, file]
    );

    return (
        <ModalComponent
            title={values ? 'Cập nhật tài khoản' : 'Thêm tài khoản'}
            modalVisible={modalVisible}
            loading={loadingModal}
            width={800}
        >
            <FormComponent layoutType="vertical" form={form} onSubmit={handleSubmit}>
                <Row style={{ flexDirection: 'row' }} gutter={[20, 0]}>
                    <Col span={12}>
                        <Row>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập tài khoản !'), rules.validateName]}
                                title="username"
                                label="Tên tài khoản"
                                inputField={<Input placeholder="Nhập tên tài khoản" />}
                            />
                            <FormItemComponent
                                rules={[
                                    { required: true, message: 'Vui lòng nhập đúng định dạng số điện thoại !' },
                                    errorValidPhone,
                                    errorWhiteSpace,
                                ]}
                                title="phoneNumber"
                                label="Số điện thoại"
                                inputField={<Input placeholder="Nhập số điện thoại" />}
                            />

                            {values && (
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng chọn trạng thái!')]}
                                    title="status"
                                    label="Trạng thái"
                                    inputField={
                                        <Select placeholder="Chọn trạng thái">
                                            <Option value={STATUS.active}>Đang hoạt động</Option>
                                            <Option value={STATUS.unActive}>Ngừng hoạt động</Option>
                                        </Select>
                                    }
                                />
                            )}
                            {!values && (
                                <>
                                    <FormItemComponent
                                        rules={[
                                            rules.required('Vui lòng nhập mật khẩu !'),
                                            {
                                                min: 6,
                                                message: 'Vui lòng nhập từ 6 ký tự!',
                                            },
                                        ]}
                                        title="password"
                                        label="Mật khẩu"
                                        inputField={<Input.Password placeholder="******" />}
                                    />
                                </>
                            )}
                        </Row>
                    </Col>

                    <Col span={12}>
                        <Row>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập họ tên !'), rules.validateName]}
                                title="name"
                                label="Họ tên"
                                inputField={<Input placeholder="Nhập tên" />}
                            />
                            <FormItemComponent
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đúng địa chỉ',
                                    },
                                ]}
                                title="address"
                                label="Địa chỉ"
                                inputField={<Input placeholder="Nhập địa chỉ" />}
                            />
                            {values ? (
                                <></>
                            ) : (
                                <>
                                    <FormItemComponent
                                        rules={[rules.required('Vui lòng nhập phòng ban !'), rules.validateName]}
                                        title="department"
                                        label="Phòng ban"
                                        inputField={<Input placeholder="Nhập phòng ban" disabled={!!values} />}
                                    />
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Row style={{ width: '100%' }} align="bottom">
                    <Space>
                        <Button
                            type="default"
                            onClick={() => {
                                handleCloseForm('notRefresh');
                                formReset();
                            }}
                        >
                            Thoát
                        </Button>
                        <SaveButton htmlType="submit" />
                    </Space>
                </Row>
            </FormComponent>
        </ModalComponent>
    );
};

export default AccountFormPage;
