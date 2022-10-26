import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import SearchInput from '@/components/SearchInput';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { PADDING } from '@/config/theme';
import Container from '@/layout/Container';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { rules } from '../../voucher/rules';
import voucherService from '../service';
import { Notification, wait } from '@/utils';
import React from 'react';
import { ADMIN, STATUS } from '@/contants';
import accountService from '../service';
import ModalComponent from '@/components/ModalComponent';
import { DataTypeAccount } from '../component/Account.Config';
import UploadComponent from '@/components/Upload';
import { errorConfirmPassword, errorValidPhone } from '@/utils/validation';
import { type } from 'os';
import useCallContext from '@/hooks/useCallContext';
const { Option } = Select;

const initialValue = {
    fullName: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    createdAt: '',
    updatedAt: '',
    password: '',
    accountId: '',
    passwordConfirmation:'',
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

    const accountId = Form.useWatch('accountId', form);
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    React.useEffect(() => {
        if (values) {
            setLoadingModal(true);
            form.setFieldsValue(values || initialValue);
            wait(500).then(() => setLoadingModal(false));
        }
    }, [values]);
    const handleSubmit = React.useCallback(
        async (data: DataTypeAccount) => {
            setLoadingModal(true);
            if (values) {
                const { accountId, phoneNumber, ...rest } = data;

                const res = await accountService.update(values.id, {
                    ...rest,
                    avatar: file,
                    status: !!data.status,
                    isRoot: true,
                });
                if (res.status === 1) {
                    Notification('success', 'Cập nhật tài khoản thành công');
                    handleCloseForm();
                    formReset();
                }
            } else {
                const res = await accountService.create({ ...data, avatar: file, status: true, isRoot: true });

                if (res.status === 1) {
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
            title={values ? 'Sửa tài khoản' : 'Thêm tài khoản'}
            modalVisible={modalVisible}
            loading={loadingModal}
        >
            <FormComponent layoutType="vertical" form={form} initialValues={initialValue} onSubmit={handleSubmit}>
                <Row gutter={[20, 0]}>
                    <FormItemComponent
                        label="Ảnh đại diện"
                        inputField={
                            <UploadComponent
                                isUploadServerWhenUploading
                                uploadType="list"
                                listType="picture-card"
                                maxLength={1}
                                onSuccessUpload={(file: any) => {
                                    setFile(file?.url);
                                }}
                            />
                        }
                    />
                    <FormItemComponent
                        rules={[rules.required('Vui lòng nhập họ tên !')]}
                        name="fullName"
                        label="Họ tên"
                        inputField={<Input placeholder="Nhập tên" />}
                    />
                    <FormItemComponent
                        rules={[
                            { required: true, message: 'Vui lòng nhập đúng định dạng số điện thoại !' },
                            errorValidPhone,
                        ]}
                        name="phoneNumber"
                        label="Số điện thoại"
                        inputField={<Input disabled={!!values} placeholder="Nhập số điện thoại" />}
                    />
                    <FormItemComponent
                        rules={[{ required: true, message: 'Vui lòng nhập đúng định dạng email!', type: 'email' }]}
                        name="email"
                        label="Email"
                        inputField={<Input placeholder="Nhập email" />}
                    />
                    <FormItemComponent
                        rules={[rules.required('Vui lòng chọn loại tài khoản!')]}
                        name="accountId"
                        label="Loại tài khoản"
                        inputField={
                            <Select placeholder="Chọn loại tài khoản">
                                <Option value={ADMIN.main}>Admin</Option>
                                <Option value={ADMIN.stall}>Admin gian hàng</Option>
                            </Select>
                        }
                    />
                    {accountId === ADMIN.stall && (
                        <FormItemComponent
                            rules={[{ required: true, message: 'Vui lòng chọn khu vực!' }]}
                            name="kiotvietId"
                            label="Khu vực"
                            inputField={
                                <Select placeholder="Chọn khu vực">
                                    {state?.kiotviets?.map((kiot) => (
                                        <Option value={kiot.id}>{kiot.name}</Option>
                                    ))}
                                </Select>
                            }
                        />
                    )}

                    {values ? (
                        <FormItemComponent
                            rules={[rules.required('Vui lòng chọn trạng thái!')]}
                            name="status"
                            label="Trạng thái"
                            inputField={
                                <Select placeholder="Chọn trạng thái">
                                    <Option value={STATUS.active}>Đang hoạt động</Option>
                                    <Option value={STATUS.unActive}>Ngừng hoạt động</Option>
                                </Select>
                            }
                        />
                    ) : (
                        <>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập mật khẩu !')]}
                                name="password"
                                label="Mật khẩu"
                                inputField={<Input.Password placeholder="******" />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập lại mật khẩu !'), errorConfirmPassword]}
                                name="passwordConfirmation"
                                label="Xác nhận mật khẩu"
                                inputField={<Input.Password placeholder="******" />}
                            />
                        </>
                    )}
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
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Space>
                </Row>
            </FormComponent>
        </ModalComponent>
    );
};

export default AccountFormPage;
