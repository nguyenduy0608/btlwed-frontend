import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { rules } from '../../voucher/rules';
import { Notification, wait } from '@/utils';
import React from 'react';
import { ADMIN, STATUS } from '@/contants';
import { NotificationService } from '../service';
import ModalComponent from '@/components/ModalComponent';
import { DataTypeNotification } from '../components/Notification.Config';
import UploadComponent from '@/components/Upload';
import { errorConfirmPassword, errorValidPhone } from '@/utils/validation';
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
    passwordConfirmation: '',
};

const NotificationFormPage = ({
    values,
    modalVisible,
    handleCloseForm,
}: {
    values?: DataTypeNotification | null;
    modalVisible: boolean;
    handleCloseForm: any;
}) => {
    const { state } = useCallContext();
    const [form] = Form.useForm();
    const [loadingModal, setLoadingModal] = React.useState(false);

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
        async (data: DataTypeNotification) => {
            setLoadingModal(true);
            // if (values) {

            //     const res = await accountService.update(values.id, {
            //         ...data
            //     });
            //     if (res.status === 1) {
            //         Notification('success', 'Cập nhật thông báo thành công');
            //         handleCloseForm();
            //         formReset();
            //     }
            // } else {
            //     const res = await accountService.create({ ...data });
            //     if (res.status === 1) {
            //         Notification('success', 'Thêm thông báo thành công');
            //         handleCloseForm();
            //         formReset();
            //     }
            // }
            setLoadingModal(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [values]
    );
    return (
        <ModalComponent
            title={values ? 'Sửa thông báo' : 'Thêm thông báo'}
            modalVisible={modalVisible}
            loading={loadingModal}
        >
            <FormComponent layoutType="vertical" form={form} initialValues={initialValue} onSubmit={handleSubmit}>
                <Row gutter={[20, 0]}>
                    <FormItemComponent
                        rules={[rules.required('Vui lòng nhập tiêu đề !')]}
                        name=""
                        label="Tiêu đề"
                        inputField={<Input placeholder="Nhập tiêu đề" />}
                    />
                    <FormItemComponent
                        rules={[rules.required('Vui lòng nhập nội dung !')]}
                        name=""
                        label="nội dung"
                        inputField={<Input placeholder="Nhập nội dung" />}
                    />
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

export default NotificationFormPage;
