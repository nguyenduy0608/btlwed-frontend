import SaveButton from '@/components/Button/Save.Button';
import CardComponent from '@/components/CardComponent';
import CustomScrollbars from '@/components/CustomScrollbars';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import TopBar from '@/components/TopBar';
import UploadComponent from '@/components/Upload';
import Container from '@/layout/Container';
import { uuid } from '@/utils';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { rules } from '../../voucher/rules';
import Content from '../components/Content';
import { newService, NEWS_STATUS, NEWS_TYPE } from '../service';

const NewsFormPage = () => {
    const [form] = Form.useForm();
    const title = Form.useWatch('title', form);

    const handleSubmit = (values: any) => {
        newService.create(values).then((res) => {
            console.log('🚀 ~ file: Form.tsx ~ line 21 ~ newService.create ~ res', res);
        });
    };

    const handleCallbackContent = React.useCallback((content: string) => {
        form.setFieldsValue({ content });
    }, []);

    return (
        <FormComponent form={form} onSubmit={handleSubmit}>
            <TopBar back title="Thêm tin tức" extra={[<SaveButton key="saveVoucher" htmlType="submit" />]} />
            <Container>
                <CardComponent>
                    <Row>
                        {/* col bên trái */}
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập mã voucher!')]}
                                    name="title"
                                    label="Tiêu đề tin tức"
                                    inputField={<Input placeholder="Nhập tiêu đề tin tức" />}
                                />

                                <FormItemComponent
                                    name="image"
                                    label={
                                        <div>
                                            Ảnh voucher <span style={{ color: 'red' }}>*</span>
                                        </div>
                                    }
                                    inputField={
                                        <UploadComponent
                                            isUploadServerWhenUploading
                                            uploadType="list"
                                            listType="picture-card"
                                            maxLength={1}
                                            onSuccessUpload={(file: any) => {
                                                form.setFieldsValue({
                                                    image: file?.url,
                                                });
                                                // setFile(file?.url);
                                            }}
                                            isShowFileList
                                            // initialFile={[{ url: values?.avatar, uid: uuid(), name: 'avatar' }]}
                                        />
                                    }
                                />
                            </Row>
                        </Col>

                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng chọn trạng thái bài viết!')]}
                                    name="status"
                                    label="Trạng thái"
                                    inputField={
                                        <Select placeholder="Chọn trạng thái">
                                            <Select.Option value={NEWS_STATUS.POST}>Đăng bài</Select.Option>
                                            <Select.Option value={NEWS_STATUS.DRAFT}>Lưu nháp</Select.Option>
                                        </Select>
                                    }
                                />
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng chọn loại tin tức!')]}
                                    name="type"
                                    label="Loại tin tức"
                                    inputField={
                                        <Select placeholder="Chọn loại tin tức">
                                            <Select.Option value={NEWS_TYPE.BANNER}>Banner</Select.Option>
                                            <Select.Option value={NEWS_TYPE.POLICY}>Chính sách</Select.Option>
                                            <Select.Option value={NEWS_TYPE.TUTORIAL}>Hướng dẫn</Select.Option>
                                        </Select>
                                    }
                                />
                                <FormItemComponent
                                    // name="enableNotification"
                                    label=" "
                                    valuePropName="checked"
                                    inputField={
                                        <Checkbox>
                                            <strong>Gửi thông báo cho khách hàng </strong>
                                        </Checkbox>
                                    }
                                />
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <p>Nội dung tin tức</p>
                        <Form.Item wrapperCol={{ span: 24 }} name="content">
                            <Content handleCallbackContent={handleCallbackContent} title={title} />
                        </Form.Item>
                    </div>
                </CardComponent>
            </Container>
        </FormComponent>
    );
};

export default NewsFormPage;
