import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from 'antd';
// import { rules } from '../../voucher/rules';
import { Notification, wait } from '@/utils';
import React from 'react';
import { ADMIN, STATUS } from '@/contants';
import { NotificationService } from '../service';
import ModalComponent from '@/components/ModalComponent';
import { DataTypeNotification } from '../components/Notification.Config';
import UploadComponent from '@/components/Upload';
import { errorConfirmPassword, errorValidPhone } from '@/utils/validation';
import useCallContext from '@/hooks/useCallContext';
import SaveButton from '@/components/Button/Save.Button';
import { rules } from '../../news/rules';
const { Option } = Select;

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
        form.setFieldsValue({
            title: '',
            content: '',
        });
    };

    React.useEffect(() => {
        if (values) {
            setLoadingModal(true);
            form.setFieldsValue(values);
            wait(500).then(() => setLoadingModal(false));
        }
    }, [values]);
    const handleSubmit = React.useCallback(
        async (data: DataTypeNotification) => {
            const newData: any = {
                title: data.title.trim(),
                content: data.content.trim(),
            };
            setLoadingModal(true);
            if (values) {
                const res = await NotificationService.update(values.id, newData);
                if (res.status) {
                    Notification('success', 'Cập nhật thông báo thành công');

                    handleCloseForm();
                    formReset();
                }
            } else {
                const res = await NotificationService.create(newData);
                if (res.status) {
                    setTimeout(() => {
                        Notification('success', 'Thêm thông báo thành công');
                        handleCloseForm();
                        formReset();
                    }, 1000);
                }
            }
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
            <FormComponent layoutType="vertical" form={form} onSubmit={handleSubmit}>
                <Row gutter={[20, 0]}>
                    <FormItemComponent
                        rules={[rules.required('Vui lòng nhập tiêu đề !')]}
                        name="title"
                        label="Tiêu đề"
                        inputField={<Input placeholder="Nhập tiêu đề" />}
                    />
                    <FormItemComponent
                        rules={[rules.required('Vui lòng nhập nội dung !')]}
                        name="content"
                        label="Nội dung"
                        inputField={<Input.TextArea rows={4} placeholder="Nhập nội dung" />}
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
                        <SaveButton htmlType="submit" />
                    </Space>
                </Row>
            </FormComponent>
        </ModalComponent>
    );
};

export default NotificationFormPage;
