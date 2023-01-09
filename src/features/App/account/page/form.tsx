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
const { Option } = Select;

const initialValue = {
    fullName: '',
    email: '',
    avatar: '',
    phoneNumber: '',
    createdAt: '',
    updatedAt: '',
    password: '',
    role: '',
    passwordConfirmation: '',
    group: undefined,
    kiotvietId: undefined,
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
            const { phoneNumber, group, ...rest } = data;
            if (values) {
                const res = await accountService.update(values.id, {
                    ...rest,
                    fullName: data.fullName.trim(),
                    email: data.email.trim(),
                    role: data.group,
                    avatar: file || values?.avatar,
                    status: !!data.status,
                    isRoot: true,
                });
                if (res.status) {
                    Notification('success', 'Cập nhật tài khoản thành công');
                    handleCloseForm();
                    formReset();
                }
            } else {
                const res = await accountService.create({
                    ...rest,
                    fullName: data.fullName.trim(),
                    email: data.email.trim(),
                    role: data?.group,
                    avatar: file,
                    status: true,
                    isRoot: true,
                    phone_number: phoneNumber,
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
                                rules={[rules.required('Vui lòng nhập họ tên !'), rules.validateName]}
                                name="fullName"
                                label="Họ tên"
                                inputField={<Input placeholder="Nhập tên" />}
                            />
                            <FormItemComponent
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đúng định dạng email!',
                                    },
                                ]}
                                name="email"
                                label="Email"
                                inputField={<Input placeholder="Nhập email" />}
                            />
                            <FormItemComponent
                                rules={[
                                    { required: true, message: 'Vui lòng nhập đúng định dạng số điện thoại !' },
                                    errorValidPhone,
                                    errorWhiteSpace,
                                ]}
                                name="phoneNumber"
                                label="Số điện thoại"
                                inputField={<Input disabled={!!values} placeholder="Nhập số điện thoại" />}
                            />
                            {values && (
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
                    </Col>

                    <Col span={12}>
                        <Row>
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
                                        isShowFileList
                                        initialFile={values && [{ url: values?.avatar, uid: uuid(), name: 'avatar' }]}
                                    />
                                }
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng chọn loại tài khoản!')]}
                                name="group"
                                label="Loại tài khoản"
                                inputField={
                                    <Select placeholder="Chọn loại tài khoản">
                                        <Option value={ADMIN.main}>Admin</Option>
                                        <Option value={ADMIN.stall}>Admin gian hàng</Option>
                                        <Option value={ADMIN.news}>Biên tập viên</Option>
                                        <Option value={ADMIN.accountant}>Kế toán</Option>
                                    </Select>
                                }
                            />
                            {group === ADMIN.stall && (
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
