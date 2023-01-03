import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { rules } from '../../voucher/rules';
import { Notification, wait } from '@/utils';
import React from 'react';
import { ADMIN, STATUS } from '@/contants';
import { WarehouseService } from '../service';
import ModalComponent from '@/components/ModalComponent';
import UploadComponent from '@/components/Upload';
import { errorConfirmPassword, errorValidPhone } from '@/utils/validation';
import useCallContext from '@/hooks/useCallContext';
import SaveButton from '@/components/Button/Save.Button';
import SelectComponent from '@/components/SelectComponent';
import SelectMultiComponent from '@/components/SelectComponent/SelectMultiComponent';
const { Option } = Select;

const WarehouseFormPage = ({
    values,
    modalVisible,
    handleCloseForm,
}: {
    values?: any;
    modalVisible: boolean;
    handleCloseForm: any;
}) => {
    const [form] = Form.useForm();
    const [loadingModal, setLoadingModal] = React.useState(false);

    const retailer: any = Form.useWatch('retailer', form);

    const formReset = () => {
        form.setFieldsValue({
            name: '',
            retailer: '',
            province: '',
        });
    };

    React.useEffect(() => {
        if (values) {
            setLoadingModal(true);
            form.setFieldsValue(values);
            wait(500).then(() => {
                setLoadingModal(false);
            });
        }
    }, [values]);
    const handleSubmit = React.useCallback(
        async (data: any) => {
            setLoadingModal(true);
            if (values) {
                let provinced: any = [];
                data.province?.forEach((item: any) => {
                    provinced?.push(item?.label);
                });
                const { retailer, name, ...rest } = data;
                let newData = {
                    ...rest,
                    province: provinced,
                    branches_id:
                        data.name === values.name ? values.kiotvietBranchesId.toString() : data.name.value.toString(),
                    kiotviet_id:
                        data.retailer === values.retailer
                            ? values.kiotvietId.toString()
                            : data.retailer.value.toString(),
                };
                const res = await WarehouseService.update(values.id, newData);
                if (res.status) {
                    Notification('success', 'Cập nhật kho hàng thành công');
                    handleCloseForm();
                    formReset();
                }
            } else {
                let provinced: any = [];
                data.province.forEach((item: any) => {
                    provinced.push(item.label);
                });
                let newData = {
                    province: provinced,
                    branches_id: data.name.value.toString(),
                    kiotviet_id: data.retailer.value.toString(),
                };
                const res = await WarehouseService.create(newData);
                if (res.status) {
                    Notification('success', 'Thêm kho hàng thành công');
                    handleCloseForm();
                    formReset();
                }
            }
            setLoadingModal(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [values]
    );
    return (
        <ModalComponent
            title={values ? 'Sửa kho hàng' : 'Thêm kho hàng'}
            modalVisible={modalVisible}
            loading={loadingModal}
        >
            <FormComponent layoutType="vertical" form={form} onSubmit={handleSubmit}>
                <Row gutter={[20, 0]}>
                    <FormItemComponent
                        label="Tên gian hàng"
                        name="retailer"
                        rules={[rules.required('Vui lòng chọn kho hàng!')]}
                        inputField={
                            <SelectComponent fieldShow="name" apiUrl={'admin/kiotViet'} placeholder="Chọn kho hàng" />
                        }
                    />
                    <FormItemComponent
                        label="Kho tự động"
                        name="name"
                        rules={[rules.required('Vui lòng chọn kho tự động!')]}
                        inputField={
                            <SelectComponent
                                disabled={!retailer?.value}
                                fieldShow="branchName"
                                apiUrl={`/admin/kiotviet/${retailer?.value}/list_branch`}
                                placeholder="Chọn kho tự động"
                            />
                        }
                    />
                    <FormItemComponent
                        label="Tỉnh/Thành phố"
                        name="province"
                        rules={[rules.required('Vui lòng chọn tỉnh thành phố!')]}
                        inputField={
                            <SelectMultiComponent
                                showFirstField
                                fieldShow="name"
                                labelProp="name"
                                apiUrl={'address/provinces'}
                                placeholder="Chọn tỉnh thành phố"
                                onChange={() => {}}
                            />
                        }
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

export default WarehouseFormPage;
