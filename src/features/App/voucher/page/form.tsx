import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import SearchInput from '@/components/SearchInput';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { PADDING } from '@/config/theme';
import Container from '@/layout/Container';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { dataSourceApplyVoucher, columnsApplyVoucher } from '../components/Voucher.Config';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { rules } from '../rules';

const VoucherFormPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Option } = Select;
    return (
        <FormComponent form={form} layoutType="vertical" onSubmit={(values) => console.log(values)}>
            <TopBar
                back
                title="Thêm voucher khách hàng"
                extra={[
                    <Button key="1" onClick={() => navigate(-1)}>
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
                                name="amount"
                                label="Số lượng voucher"
                                inputField={
                                    <InputNumber
                                        min={0}
                                        max={99}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                        placeholder="Nhập số lượng voucher"
                                        // addonAfter={lang(t).contract_frequency}
                                    />
                                }
                            />

                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập trạng thái voucher!')]}
                                name="status"
                                label="Trạng thái"
                                inputField={
                                    <Select placeholder="Nhập trạng thái voucher">
                                        <Option value="Đang hoạt động">Đang hoạt động</Option>
                                        <Option value="ngừng hoạt động">Ngừng hoạt động</Option>
                                    </Select>
                                }
                            />
                            <FormItemComponent
                                name="amountUsed"
                                label="Số lượng voucher đã dùng"
                                inputField={
                                    <InputNumber
                                        min={0}
                                        max={99}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                        placeholder="Nhập Số lượng voucher đã dùng"
                                        // addonAfter={lang(t).contract_frequency}
                                    />
                                }
                            />
                            <FormItemComponent
                                name="amountRemaining"
                                label="Số lượng voucher còn lại"
                                inputField={
                                    <InputNumber
                                        min={0}
                                        max={99}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                        placeholder="Nhập Số lượng voucher còn lại"
                                        // addonAfter={lang(t).contract_frequency}
                                    />
                                }
                            />
                            <FormItemComponent
                                name="reduce"
                                label="Mức giảm"
                                inputField={
                                    <InputNumber
                                        min={0}
                                        max={99}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                        placeholder="Nhập mức giảm"
                                        addonAfter={'%'}
                                        // addonAfter={lang(t).contract_frequency}
                                    />
                                }
                            />
                            <FormItemComponent
                                name="reduceMax"
                                label="Giá trị giảm tối đa"
                                inputField={
                                    <InputNumber
                                        min={0}
                                        max={1000000}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                        placeholder="Nhập giá trị giảm tối đa"
                                    />
                                }
                            />
                            <FormItemComponent
                                name="minimumValue"
                                label="Giá trị đơn hàng tối thiểu"
                                inputField={
                                    <InputNumber
                                        min={0}
                                        max={10000000}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                        placeholder="Nhập giá trị đơn hàng tối thiểu"
                                    />
                                }
                            />
                            <FormItemComponent
                                name="provided"
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
                                name="createAt"
                                label="Ngày bắt đầu"
                                inputField={<DatePicker placeholder="Ngày" style={{ width: '100%' }} />}
                            />
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập ngày kết thúc!')]}
                                name="endAt"
                                label="Ngày kết thúc"
                                inputField={<DatePicker placeholder="Ngày" style={{ width: '100%' }} />}
                            />
                            <FormItemComponent
                                name="apply"
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
                    <TableComponent
                        header={
                            <Row style={{ flexDirection: 'row' }} justify="space-between" align="middle">
                                <h3 className="gx-m-0 gx-font-weight-medium">ÁP DỤNG CHO TẤT CẢ SẢN PHẨM</h3>
                                <Space>
                                    <SearchInput
                                        placeholderSearch="Nhập tên sản phẩm"
                                        onChangeSearch={() => console.log('first')}
                                    />
                                </Space>
                            </Row>
                        }
                        columns={columnsApplyVoucher}
                        dataSource={dataSourceApplyVoucher}
                        page={0}
                        onChangePage={function (page: number): void {
                            throw new Error('Function not implemented.');
                        }}
                    />
                </CardComponent>
            </Container>
        </FormComponent>
    );
};

export default VoucherFormPage;
