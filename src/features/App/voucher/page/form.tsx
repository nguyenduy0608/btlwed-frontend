import SaveButton from '@/components/Button/Save.Button';
import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import LoadingComponent from '@/components/Loading';
import TopBar from '@/components/TopBar';
import UploadComponent from '@/components/Upload';
import { APPLICABLE_TYPE, CUSTOMER_TYPE, REWARD } from '@/contants';
import useWindowSize from '@/hooks/useWindowSize';
import Container from '@/layout/Container';
import { checkNowDate, momentParseUtc, Notification, uuid } from '@/utils';
import { Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select } from 'antd';
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
    const startDate = Form.useWatch('startTime', form);
    const nameVoucher = React.useRef(null);

    const [file, setFile] = React.useState<any>(null);

    const fileEdit = React.useRef<any>(null);

    const [products, setProducts] = React.useState([]);
    const [productSelected, setProductSelected] = React.useState<any>([]);

    // loading add
    const [loading, setLoading] = React.useState(false);

    // handle edit voucher
    const { id } = useParams();

    // lưu số lượng
    const [quantity, setQuantity] = React.useState({
        used: 0,
        remaining: 0,
        quota: 0,
    });

    const handleSubmit = React.useCallback(
        async (data: any) => {
            console.log('🚀 ~ file: form.tsx:71 ~ data', data);
            if (!id && !file) return Notification('warning', 'Vui lòng chọn ảnh');
            setLoading(true);
            const formData = new FormData();

            const dataUpload = {
                ...data,
                startTime: data.startTime ? moment(data.startTime).format('YYYY-MM-DD HH:mm') : '',
                endTime: data.endTime ? moment(data.endTime).format('YYYY-MM-DD HH:mm') : '',
                enableNotification: data?.enableNotification ? 1 : 0,
                enableProducts: data?.enableProducts ? 1 : 0,
                status: 1,
                products: data?.enableProducts ? [] : products,
                description: data?.description ? data?.description : '',
                minSpend: data?.minSpend ? data?.minSpend : 0,
            };
            if (applicableType === APPLICABLE_TYPE.order) {
                delete dataUpload.products;
            }

            for (var key in dataUpload) {
                if (dataUpload[key]) {
                    formData.append(
                        decamelize(key),
                        Array.isArray(dataUpload[key]) ? JSON.stringify(dataUpload[key]) : dataUpload[key]
                    );
                }
            }

            formData.append('file', file ? file : fileEdit.current[0].url);

            if (id) {
                voucherService
                    .update(id, formData)
                    .then((res) => {
                        if (res.status) {
                            navigate(-1);
                            Notification('success', 'Cập nhật thành công');
                        }
                    })
                    .finally(() => setLoading(false));
            } else {
                voucherService
                    .create(formData)
                    .then((res) => {
                        if (res.status) {
                            navigate(-1);
                            Notification('success', 'Thêm voucher thành công');
                        }
                    })
                    .finally(() => setLoading(false));
            }
        },
        [file, id, products]
    );

    React.useEffect(() => {
        if (!id) return;

        (async () => {
            voucherService.detail(+id).then((res) => {
                if (res.status) {
                    const fieldValues: any = {
                        ...res.data,
                    };

                    if (res?.data?.rewardType === REWARD.gift) {
                        delete fieldValues?.applicableType;
                        delete fieldValues?.rewardPercentage;
                    }

                    form.setFieldsValue({
                        ...fieldValues,
                        startTime: momentParseUtc(res.data.startTime),
                        endTime: momentParseUtc(res.data.endTime),
                        enableNotification: res.data.enableNotification === 1,
                        enableProducts: res.data.enableProducts === 1,
                    });

                    fileEdit.current = [{ url: res.data?.image, uid: uuid(), name: 'demo' }];

                    if (res?.data?.voucherProduct) {
                        setProductSelected(res.data?.voucherProduct.map((product: any) => product.productId));
                        setProducts(res.data?.voucherProduct.map((product: any) => product?.productVariant?.product));
                    }

                    setQuantity({
                        quota: res.data?.quota,
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
                extra={[<SaveButton key="saveVoucher" htmlType="submit" />]}
            />
            <Container>
                <CardComponent>
                    <Row>
                        {/* col bên trái */}
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập mã voucher!'), rules.validateCode]}
                                    name="code"
                                    label="Mã voucher"
                                    inputField={
                                        <Input
                                            onBlur={async (e) => {
                                                if (!(e.target.value.length > 6)) return;
                                                const result = await voucherService.checkExitsVoucher(e.target.value);
                                                if (result) {
                                                    form.setFields([
                                                        {
                                                            name: 'code',
                                                            errors: ['Mã voucher đã tồn tại'],
                                                        },
                                                    ]);
                                                }
                                            }}
                                            disabled={!!id}
                                            placeholder="Nhập mã voucher"
                                        />
                                    }
                                />
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập tên voucher!'), rules.validateName]}
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
                                            min={1}
                                            style={{ width: '100%' }}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                            placeholder="Nhập số lượng voucher"
                                        />
                                    }
                                />
                                <FormItemComponent
                                    rules={[{ required: true, message: 'Vui lòng nhập số lần sử dụng voucher!' }]}
                                    name="vouchersPerUser"
                                    label="Số lần sử dụng voucher"
                                    inputField={
                                        <InputNumber
                                            min={1}
                                            max={5000}
                                            style={{ width: '100%' }}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                            placeholder="Nhập số lần sử dụng voucher"
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
                                            accept="image/png, image/jpeg"
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
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng chọn loại khách hàng!')]}
                                    name="customerType"
                                    label="Loại khách hàng"
                                    inputField={
                                        <Select placeholder="Chọn loại khách hàng">
                                            <Option value={CUSTOMER_TYPE.ALL}>Tất cả</Option>
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
                                            label="Số lượng sản phẩm cần mua"
                                            inputField={
                                                <InputNumber
                                                    // min={1}
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                    parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                                    placeholder="Nhập số lượng sản phẩm cần mua"
                                                />
                                            }
                                        />
                                        <FormItemComponent
                                            name="minSpend"
                                            label="Tổng giá trị sản phẩm tối thiểu"
                                            inputField={
                                                <InputNumber
                                                    // min={0}
                                                    max={10000000}
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                    parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
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
                                                    min={1}
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                    parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
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
                                                    max={10000000}
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                    parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                                    placeholder="Nhập tổng giá trị"
                                                />
                                            }
                                        />
                                        <FormItemComponent
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập giá trị giảm tối đa!' },
                                                {
                                                    validator: (_: any, value: number) => {
                                                        if (value < 1) {
                                                            return Promise.reject('Giá trị giảm tối đa lớn hơn 0');
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ]}
                                            name="rewardCap"
                                            label="Giá trị giảm tối đa"
                                            inputField={
                                                <InputNumber
                                                    max={50000000}
                                                    style={{ width: '100%' }}
                                                    formatter={(value) =>
                                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                                    }
                                                    parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
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
                                            inputField={<strong>{quantity.quota - quantity.remaining}</strong>}
                                        />
                                        <FormItemComponent
                                            label="Số lượng còn lại"
                                            valuePropName="checked"
                                            inputField={<strong>{quantity.remaining}</strong>}
                                        />
                                    </>
                                )}
                            </Row>
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
                                        // disabledDate={(current: any) => {
                                        //     return current && current < moment().startOf('day');
                                        // }}
                                        // disabledTime={() => ({
                                        //     disabledHours: () => {
                                        //         const timePrevCurrentDay = [
                                        //             ...new Array(Number(moment().format('HH'))),
                                        //         ].map((_, index) => index);

                                        //         return moment().format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')
                                        //             ? []
                                        //             : [...timePrevCurrentDay];
                                        //     },
                                        //     disabledMinutes: () => {
                                        //         const timePrevCurrentDay = [
                                        //             ...new Array(Number(moment().format('mm'))),
                                        //         ].map((_, index) => index);

                                        //         return [...timePrevCurrentDay];
                                        //     },
                                        // })}
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
                                        disabledDate={(current: any) => {
                                            if (startDate) return current < moment(startDate).startOf('day');

                                            return current && current < moment().startOf('day');
                                        }}
                                        disabledTime={() => ({
                                            // disabledHours: () => {
                                            //     const timePrevCurrentDay = [
                                            //         ...new Array(Number(moment().format('HH'))),
                                            //     ].map((_, index) => index);
                                            //     return moment().format('YYYY-MM-DD') !==
                                            //         moment(startDate).format('YYYY-MM-DD')
                                            //         ? []
                                            //         : [...timePrevCurrentDay];
                                            // },
                                            // disabledMinutes: () => {
                                            //     const timePrevCurrentDay = [
                                            //         ...new Array(Number(moment().format('mm'))),
                                            //     ].map((_, index) => index);
                                            //     return [...timePrevCurrentDay];
                                            // },
                                        })}
                                    />
                                }
                            />
                            {(rewardType === REWARD.gift || applicableType === APPLICABLE_TYPE.product) && (
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
                            )}
                        </Col>
                    </Row>
                    {(rewardType === REWARD.gift || applicableType === APPLICABLE_TYPE.product) && (
                        <>
                            <Divider />
                            <div style={enableProducts ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                                <TableProduct
                                    productSelected={productSelected}
                                    products={products}
                                    setProducts={setProducts}
                                />
                            </div>
                        </>
                    )}
                </CardComponent>
            </Container>
            {loading && <LoadingComponent />}
        </FormComponent>
    );
};

export default VoucherFormPage;
