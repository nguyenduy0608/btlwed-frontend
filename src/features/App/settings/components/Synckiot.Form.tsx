import SaveButton from '@/components/Button/Save.Button';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import SelectComponent from '@/components/SelectComponent';
import { Button, Input, message, Row, Space, Spin } from 'antd';
import React from 'react';
import { rules } from '../../voucher/rules';
import { settingService } from '../service';

const SynckiotForm = ({
    step,
    handleNextStep,
    handleBackStep,
    handleClose,
}: {
    step: number;
    handleNextStep: () => void;
    handleBackStep: () => void;
    handleClose: () => void;
}) => {
    const [loadingStep1, setLoadingStep1] = React.useState(false);
    const [kiotvietId, setKiotvietId] = React.useState('');

    const handleSubmitStep1 = (values: any) => {
        setLoadingStep1(true);
        settingService
            .postKiotviet(values)
            .then((res: any) => {
                setKiotvietId(res.data.id);
                message.success('Thêm mới gian hàng thành công!');
                handleNextStep();
            })
            .finally(() => {
                setLoadingStep1(false);
            });
    };
    const handleSubmitStep2 = (values: any) => {
        const branchId = values?.defaultBranchId?.value;
        settingService
            .branchKiotviet(kiotvietId, {
                defaultBranchId: branchId,
            })
            .then((res: any) => {
                if (res.status) {
                    message.success('Cập nhật chi nhánh thành công!');
                    handleClose();
                } else {
                    message.error('Có lỗi xảy ra!');
                }
            });
    };

    switch (step) {
        case 0:
            return (
                <Spin spinning={loadingStep1}>
                    <FormComponent layoutType="vertical" onSubmit={handleSubmitStep1}>
                        <FormItemComponent
                            label="Tên kết nối"
                            name="retailer"
                            rules={[rules.required('Vui lòng nhập tên kết nối!')]}
                            inputField={<Input placeholder="Nhập tên kết nối" />}
                        />
                        <FormItemComponent
                            label="Tên gian hàng"
                            name="name"
                            rules={[rules.required('Vui lòng nhập tên gian hàng!')]}
                            inputField={<Input placeholder="Nhập tên gian hàng" />}
                        />
                        <FormItemComponent
                            label="Client id"
                            name="clientId"
                            rules={[rules.required('Vui lòng nhập client id!')]}
                            inputField={<Input placeholder="Nhập client id" />}
                        />
                        <FormItemComponent
                            label="Secret id"
                            name="clientSecret"
                            rules={[rules.required('Vui lòng nhập secret id!')]}
                            inputField={<Input placeholder="Nhập secret id" />}
                        />
                        <Row className="gx-m-0 gx-px-2" style={{ flexDirection: 'row' }} justify="end">
                            <Space>
                                <Button onClick={handleClose}>Đóng</Button>
                                <Button htmlType="submit" type="primary">
                                    Tiếp theo
                                </Button>
                            </Space>
                        </Row>
                    </FormComponent>
                </Spin>
            );
        case 1:
            return (
                <FormComponent layoutType="vertical" onSubmit={handleSubmitStep2}>
                    {kiotvietId && (
                        <FormItemComponent
                            label="Kho hàng"
                            name="defaultBranchId"
                            rules={[rules.required('Vui lòng chọn kho hàng để chuyển đơn sang Kiot Việt!')]}
                            inputField={
                                <SelectComponent
                                    fieldShow="branchName"
                                    apiUrl={`/admin/kiotviet/${kiotvietId}/list_branch`}
                                    placeholder="Chọn kho hàng"
                                />
                            }
                        />
                    )}

                    <Row className="gx-m-0 gx-px-2" style={{ flexDirection: 'row' }} justify="end">
                        <Space>
                            <SaveButton htmlType="submit" />
                        </Space>
                    </Row>
                </FormComponent>
            );
        default:
            return null;
    }
};

export default SynckiotForm;
