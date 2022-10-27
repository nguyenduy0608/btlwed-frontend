import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import SearchInput from '@/components/SearchInput';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { dataSourceApplyVoucher, columnsApplyVoucher, DataTypeVoucher } from '../components/Voucher.Config';
import { useNavigate } from 'react-router-dom';
import { rules } from '../rules';
import voucherService from '../service';
import React from 'react';
import { APPLICABLE_TYPE, CUSTOMER_TYPE, REWARD, STATUS } from '@/contants';
import UploadComponent from '@/components/Upload';
import moment from 'moment';
import { decamelize } from 'humps';
import TableProduct from '../components/Table.Product';
const { Option } = Select;

const initialValue = {
    code: '',
    name: '',
    status: '',
    rewardCap: '',
    quota: '',
    remainQuota: '',
    rewardType: '',
    minSpend: '',
    rewardPercentage: '',
    startTime: '',
    endTime: '',
    enableNotification: '',
    createdAt: '',
    updatedAt: '',
};

const VoucherFormPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const rewardType = Form.useWatch('rewardType', form);
    const enableProducts = Form.useWatch('enableProducts', form);

    const [file, setFile] = React.useState<any>(null);
    console.log('🚀 ~ file: form.tsx ~ line 47 ~ VoucherFormPage ~ file', file);

    const [loadingModal, setLoadingModal] = React.useState(false);
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const handleSubmit = React.useCallback(async (data: any) => {
        const formData = new FormData();

        const dataUpload = {
            ...data,
            startTime: data.startTime ? moment(data.startTime).format('YYYY-MM-DD') : '',
            endTime: data.endTime ? moment(data.endTime).format('YYYY-MM-DD') : '',
            enableNotification: data?.enableNotification ? 1 : 0,
            enableProducts: data?.enableProducts ? 1 : 0,
            products: [],
        };
        formData.append('file', file);
        for (var key in dataUpload) {
            formData.append(decamelize(key), dataUpload[key]);
        }

        voucherService.create(formData).then((res) => {
            console.log('🚀 ~ file: form.tsx ~ line 61 ~ voucherService.create ~ res', res);
        });
    }, []);

    return (
        <FormComponent form={form} layoutType="vertical" onSubmit={handleSubmit}>
            <TopBar
                back
                title="Thêm voucher khách hàng"
                extra={[
                    <Button
                        key="1"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Thoát
                    </Button>,
                    <Button key="2" type="primary" htmlType="submit">
                        Lưu
                    </Button>,
                ]}
            />
            <Container>
                <CardComponent>
                    <Row style={{ flexDirection: 'row' }}>
                        <Col span={6}>
                            <h2 className="gx-font-weight-medium">Thông tin chung</h2>
                        </Col>
                        <Col span={18}>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập mã voucher!')]}
                                name="code"
                                label="Mã voucher"
                                inputField={<Input placeholder="Nhập mã voucher" />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập tên voucher!')]}
                                name="name"
                                label="Tên voucher"
                                inputField={<Input placeholder="Nhập tên voucher" />}
                            />
                            <FormItemComponent
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng voucher!' }]}
                                name="quota"
                                label="Số lượng voucher"
                                inputField={
                                    <InputNumber
                                        min={0}
                                        max={99}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                        placeholder="Nhập số lượng voucher"
                                    />
                                }
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng chọn loại khách hàng!')]}
                                name="customerType"
                                label="Loại khách hàng"
                                inputField={
                                    <Select placeholder="Chọn loại khách hàng">
                                        <Option value={CUSTOMER_TYPE.AGENT}>Đại lý</Option>
                                        <Option value={CUSTOMER_TYPE.DISTRIBUTORS}>Nhà phân phối</Option>
                                    </Select>
                                }
                            />
                            {/* <FormItemComponent
                                rules={[rules.required('Vui lòng nhập trạng thái voucher!')]}
                                name="status"
                                label="Trạng thái"
                                inputField={
                                    <Select placeholder="Chọn trạng thái">
                                        <Option value={STATUS.active}>Đang hoạt động</Option>
                                        <Option value={STATUS.unActive}>Ngừng hoạt động</Option>
                                    </Select>
                                }
                            /> */}
                            <FormItemComponent
                                rules={[rules.required('Vui lòng chọn loại giảm voucher!')]}
                                name="rewardType"
                                label="Loại giảm"
                                inputField={
                                    <Select placeholder="Chọn loại giảm voucher">
                                        <Option value={REWARD.gift}>Tặng quà</Option>
                                        <Option value={REWARD.discount}>Chiết khấu</Option>
                                    </Select>
                                }
                            />
                            {/* chỗ này check khi loại giảm là tặng quà */}
                            {rewardType === REWARD.gift && (
                                <>
                                    <FormItemComponent
                                        name="quantityBuy"
                                        label="Số lượng sản phẩm cần phải mua"
                                        inputField={
                                            <InputNumber
                                                min={0}
                                                max={99}
                                                style={{ width: '100%' }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                                placeholder="Nhập số lượng sản phẩm cần phải mua"
                                            />
                                        }
                                    />
                                    <FormItemComponent
                                        name="minSpend"
                                        label="Tổng giá trị sản phẩm tối thiểu"
                                        inputField={
                                            <InputNumber
                                                min={0}
                                                max={10000000}
                                                style={{ width: '100%' }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                                placeholder="Nhập tổng giá trị"
                                            />
                                        }
                                    />
                                </>
                            )}
                            {/* chỗ này check khi loại giảm là chiết khấu */}
                            {rewardType === REWARD.discount && (
                                <>
                                    <FormItemComponent
                                        rules={[rules.required('Vui lòng chọn loại áp dụng!')]}
                                        name="applicableType"
                                        label="Loại áp dụng"
                                        inputField={
                                            <Select placeholder="Chọn loại áp dụng">
                                                <Option value={APPLICABLE_TYPE.product}>Sản phẩm</Option>
                                                <Option value={APPLICABLE_TYPE.order}>Đơn hàng</Option>
                                            </Select>
                                        }
                                    />
                                    <FormItemComponent
                                        name="rewardPercentage"
                                        label="Mức giảm"
                                        rules={[rules.required('Vui lòng nhập mức giảm ')]}
                                        inputField={
                                            <InputNumber
                                                min={0}
                                                max={50000000}
                                                style={{ width: '100%' }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                                placeholder="Nhập mức giảm"
                                                addonAfter={'%'}
                                            />
                                        }
                                    />
                                    <FormItemComponent
                                        name="minSpend"
                                        label="Tổng giá trị đơn hàng tối thiểu"
                                        inputField={
                                            <InputNumber
                                                min={0}
                                                max={10000000}
                                                style={{ width: '100%' }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                                placeholder="Nhập tổng giá trị"
                                            />
                                        }
                                    />
                                    <FormItemComponent
                                        rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm tối đa!' }]}
                                        name="rewardCap"
                                        label="Giá trị giảm tối đa"
                                        inputField={
                                            <InputNumber
                                                min={0}
                                                max={50000000}
                                                style={{ width: '100%' }}
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                                placeholder="Nhập giá trị giảm tối đa"
                                            />
                                        }
                                    />
                                </>
                            )}

                            <FormItemComponent
                                name="description"
                                label="Mô tả"
                                inputField={<Input.TextArea rows={5} placeholder="Nhập ghi chú" />}
                            />
                            <FormItemComponent
                                label="Ảnh voucher"
                                inputField={
                                    <UploadComponent
                                        // isUploadServerWhenUploading
                                        uploadType="list"
                                        listType="picture-card"
                                        maxLength={1}
                                        onSuccessUpload={(url: any) => {
                                            setFile(url?.originFileObj);
                                        }}
                                    />
                                }
                            />
                            <FormItemComponent
                                name="enableNotification"
                                label=""
                                valuePropName="checked"
                                inputField={
                                    <Checkbox>
                                        <strong>Gửi thông báo cho khách hàng </strong>
                                    </Checkbox>
                                }
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Row style={{ flexDirection: 'row' }}>
                        <Col span={6}>
                            <h2 className="gx-font-weight-medium">Thời gian áp dụng</h2>
                        </Col>
                        <Col span={18}>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập ngày bắt đầu!')]}
                                name="startTime"
                                label="Ngày bắt đầu"
                                inputField={<DatePicker placeholder="Chọn ngày bắt đầu" style={{ width: '100%' }} />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập ngày kết thúc!')]}
                                name="endTime"
                                label="Ngày kết thúc"
                                inputField={<DatePicker placeholder="Chọn ngày kết thúc" style={{ width: '100%' }} />}
                            />
                            <FormItemComponent
                                name="enableProducts"
                                label=""
                                valuePropName="checked"
                                inputField={
                                    <Checkbox>
                                        <strong>Áp dụng cho toàn bộ sản phẩm</strong>
                                    </Checkbox>
                                }
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <div style={enableProducts ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                        <TableProduct />
                    </div>
                </CardComponent>
            </Container>
        </FormComponent>
    );
};

export default VoucherFormPage;
