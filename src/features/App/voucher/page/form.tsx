import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import TopBar from '@/components/TopBar';
import UploadComponent from '@/components/Upload';
import { APPLICABLE_TYPE, CUSTOMER_TYPE, REWARD } from '@/contants';
import useWindowSize from '@/hooks/useWindowSize';
import Container from '@/layout/Container';
import { Notification, uuid } from '@/utils';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select } from 'antd';
import { decamelize } from 'humps';
import moment from 'moment';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableProduct from '../components/Table.Product';
import { rules } from '../rules';
import voucherService from '../service';
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
    const { width } = useWindowSize();

    const rewardType = Form.useWatch('rewardType', form);
    const enableProducts = Form.useWatch('enableProducts', form);
    const applicableType = Form.useWatch('applicableType', form);
    const nameVoucher = React.useRef(null);

    const [file, setFile] = React.useState<any>(null);

    const fileEdit = React.useRef<any>(null);

    const [products, setProducts] = React.useState([]);
    const [productSelected, setProductSelected] = React.useState<any>([]);

    // handle edit voucher
    const { id } = useParams();

    // lưu số lượng
    const [quantity, setQuantity] = React.useState({
        used: 0,
        remaining: 0,
    });

    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    const handleSubmit = React.useCallback(
        async (data: any) => {
            if (!id && !file) return Notification('warning', 'Vui lòng chọn ảnh');

            const formData = new FormData();

            const dataUpload = {
                ...data,
                startTime: data.startTime ? moment(data.startTime).format('YYYY-MM-DD HH:mm') : '',
                endTime: data.endTime ? moment(data.endTime).format('YYYY-MM-DD HH:mm') : '',
                enableNotification: data?.enableNotification ? 1 : 0,
                enableProducts: data?.enableProducts ? 1 : 0,
                status: 1,
                products: data?.enableProducts ? [] : products,
            };

            for (var key in dataUpload) {
                formData.append(
                    decamelize(key),
                    Array.isArray(dataUpload[key]) ? JSON.stringify(dataUpload[key]) : dataUpload[key]
                );
            }

            formData.append('file', file ? file : fileEdit.current[0].url);

            if (id) {
                voucherService.update(id, formData).then((res) => {
                    if (res.status) {
                        navigate(-1);
                        Notification('success', 'Cập nhật thành công');
                    }
                });
            } else {
                voucherService.create(formData).then((res) => {
                    if (res.status) {
                        navigate(-1);
                        Notification('success', 'Thêm voucher thành công');
                    }
                });
            }
        },
        [file, id, products]
    );

    React.useEffect(() => {
        if (!id) return;

        (async () => {
            voucherService.detail(+id).then((res) => {
                if (res.status) {
                    form.setFieldsValue({
                        ...res.data,
                        startTime: moment(res.data.startTime),
                        endTime: moment(res.data.endTime),
                        enableNotification: res.data.enableNotification === 1,
                        enableProducts: res.data.enableProducts === 1,
                    });
                    fileEdit.current = [{ url: res.data?.image, uid: uuid(), name: 'demo' }];
                    if (res?.data?.voucherProduct) {
                        setProductSelected(res.data?.voucherProduct.map((product: any) => product.productId));
                        setProducts(
                            res.data?.voucherProduct.map((product: any) => ({ ...product, id: product.productId }))
                        );
                    }
                    setQuantity({
                        used: res?.data?.used || 0,
                        remaining: res?.data?.remainQuota,
                    });

                    nameVoucher.current = res.data.name;
                }
            });
        })();
    }, [id]);

    return (
        <FormComponent form={form} initialValues={{ enableProducts: true }} onSubmit={handleSubmit}>
            <TopBar
                back
                title={id ? 'Cập nhật voucher ' + `* ${nameVoucher.current} *` : 'Thêm voucher khách hàng'}
                extra={[
                    <Button
                        key="out"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Thoát
                    </Button>,
                    <Button key="saveVoucher" type="primary" htmlType="submit">
                        Lưu
                    </Button>,
                ]}
            />
            <Container>
                <CardComponent>
                    <Row>
                        {/* col bên trái */}
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
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
                                    name="description"
                                    label="Mô tả"
                                    inputField={<Input.TextArea rows={5} placeholder="Nhập ghi chú" />}
                                />
                                <FormItemComponent
                                    label={
                                        <div>
                                            Ảnh voucher <span style={{ color: 'red' }}>*</span>
                                        </div>
                                    }
                                    inputField={
                                        <UploadComponent
                                            // isUploadServerWhenUploading
                                            initialFile={fileEdit.current}
                                            uploadType="list"
                                            listType="picture-card"
                                            maxLength={1}
                                            onSuccessUpload={(url: any) => {
                                                setFile(url?.originFileObj);
                                            }}
                                        />
                                    }
                                />
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} lg={12}>
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
                                        label={
                                            applicableType === APPLICABLE_TYPE.order
                                                ? `Tổng giá trị đơn hàng tối thiểu`
                                                : `Tổng giá trị sản phẩm tối thiểu`
                                        }
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
                                name="enableNotification"
                                label=" "
                                valuePropName="checked"
                                inputField={
                                    <Checkbox>
                                        <strong>Gửi thông báo cho khách hàng </strong>
                                    </Checkbox>
                                }
                            />
                            {id && (
                                <>
                                    <FormItemComponent
                                        label="Số lượng đã dùng"
                                        valuePropName="checked"
                                        inputField={<strong>{quantity.used}</strong>}
                                    />
                                    <FormItemComponent
                                        label="Số lượng còn lại"
                                        valuePropName="checked"
                                        inputField={<strong>{quantity.remaining}</strong>}
                                    />
                                </>
                            )}
                        </Col>
                    </Row>

                    <Divider />
                    <Row style={{ flexDirection: 'row' }}>
                        <Col xs={24} sm={24} lg={4}>
                            <h2 className="gx-font-weight-medium">Thời gian áp dụng</h2>
                        </Col>
                        <Col xs={24} sm={24} lg={20}>
                            <FormItemComponent
                                grid={width > 1024}
                                rules={[rules.required('Vui lòng nhập ngày bắt đầu!')]}
                                name="startTime"
                                label="Ngày bắt đầu"
                                inputField={
                                    <DatePicker
                                        showTime
                                        format="HH:mm DD/MM/YYYY"
                                        placeholder="Chọn ngày bắt đầu"
                                        style={{ width: '100%' }}
                                    />
                                }
                            />
                            <FormItemComponent
                                grid={width > 1024}
                                rules={[rules.required('Vui lòng nhập ngày kết thúc!')]}
                                name="endTime"
                                label="Ngày kết thúc"
                                inputField={
                                    <DatePicker
                                        showTime
                                        format="HH:mm DD/MM/YYYY"
                                        placeholder="Chọn ngày kết thúc"
                                        style={{ width: '100%' }}
                                    />
                                }
                            />
                            <FormItemComponent
                                grid={width > 1024}
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
                        <TableProduct productSelected={productSelected} products={products} setProducts={setProducts} />
                    </div>
                </CardComponent>
            </Container>
        </FormComponent>
    );
};

export default VoucherFormPage;
