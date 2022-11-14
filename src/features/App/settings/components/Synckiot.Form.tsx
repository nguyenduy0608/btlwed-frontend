import SaveButton from '@/components/Button/Save.Button';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import IconAntd from '@/components/IconAntd';
import SelectComponent from '@/components/SelectComponent';
import { Button, Input, Row, Space } from 'antd';
import React from 'react';
import { rules } from '../../voucher/rules';

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
    const handleSubmitStep1 = (values: any) => {
        console.log('🚀 ~ file: Synckiot.Form.tsx ~ line 23 ~ handleSubmitStep1 ~ values', values);
        handleNextStep();
    };
    const handleSubmitStep2 = (values: any) => {
        console.log('🚀 ~ file: Synckiot.Form.tsx ~ line 23 ~ handleSubmitStep1 ~ values', values);
        handleClose();
    };

    switch (step) {
        case 0:
            return (
                <FormComponent layoutType="vertical" onSubmit={handleSubmitStep1}>
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
                        name="secretId"
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
            );
        case 1:
            return (
                <FormComponent layoutType="vertical" onSubmit={handleSubmitStep2}>
                    <FormItemComponent
                        label="Kho hàng"
                        name="shop"
                        rules={[rules.required('Vui lòng chọn kho hàng!')]}
                        inputField={<SelectComponent apiUrl="/address/provinces" placeholder="Chọn kho hàng" />}
                    />

                    <Row className="gx-m-0 gx-px-2" style={{ flexDirection: 'row' }} justify="end">
                        <Space>
                            <Button icon={<IconAntd icon="ArrowLeftOutlined" size="16px" />} onClick={handleBackStep}>
                                Trở lại
                            </Button>
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
