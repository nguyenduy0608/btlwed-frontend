import SaveButton from '@/components/Button/Save.Button';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import ModalComponent from '@/components/ModalComponent';
import SelectComponent from '@/components/SelectComponent';
import SelectMultiComponent from '@/components/SelectComponent/SelectMultiComponent';
import { DefaultSelectStyled } from '@/config/global.style';
import useCallContext from '@/hooks/useCallContext';
import { Notification, wait } from '@/utils';
import { Button, Form, Row, Select, Space } from 'antd';
import React from 'react';
import { rules } from '../../voucher/rules';
import { WarehouseService } from '../service';

const WarehouseFormPage = ({
    values,
    modalVisible,
    handleCloseForm,
}: {
    values?: any;
    modalVisible: boolean;
    handleCloseForm: any;
}) => {
    const { state } = useCallContext();

    const [form] = Form.useForm();
    const [loadingModal, setLoadingModal] = React.useState(false);

    const retailer: any = Form.useWatch('retailer', form);
    const branch_id: any = Form.useWatch('name', form);

    const formReset = () => {
        form.setFieldsValue({
            name: null,
            retailer: null,
            province: null,
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
                    branches_id: data.name.value.toString(),
                    kiotviet_id: data.retailer.toString(),
                };
                const res = await WarehouseService.update(values.id, newData);
                if (res.status) {
                    Notification('success', 'Cập nhật kho hàng thành công');
                    formReset();
                    handleCloseForm();
                }
            } else {
                let provinced: any = [];
                data.province.forEach((item: any) => {
                    provinced.push(item.label);
                });
                let newData = {
                    province: provinced,
                    branches_id: data.name.value.toString(),
                    kiotviet_id: data.retailer.toString(),
                };
                const res = await WarehouseService.create(newData);
                if (res.status) {
                    Notification('success', 'Thêm kho hàng thành công');
                    formReset();
                    handleCloseForm();
                }
            }
            setLoadingModal(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [values]
    );

    React.useEffect(() => {
        if (retailer) {
            form.setFieldsValue({
                name: null,
            });
        }
    }, [retailer]);

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
                            <DefaultSelectStyled allowClear placeholder="Chọn kho hàng">
                                {state?.kiotviets &&
                                    state?.kiotviets.map((item: any) => (
                                        <DefaultSelectStyled.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </DefaultSelectStyled.Option>
                                    ))}
                            </DefaultSelectStyled>
                        }
                    />
                    {/* <SelectComponent fieldShow="name" apiUrl={'admin/kiotViet'} placeholder="" /> */}
                    <FormItemComponent
                        label="Kho tự động"
                        name="name"
                        rules={[rules.required('Vui lòng chọn kho tự động!')]}
                        inputField={
                            <SelectComponent
                                disabled={!retailer}
                                value={branch_id?.value}
                                fieldShow="branchName"
                                apiUrl={`/admin/kiotviet/${retailer}/list_branch`}
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
                                defaultSelect={values ? values?.province : null}
                                // onChange={() => {}}
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
