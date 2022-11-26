import SaveButton from '@/components/Button/Save.Button';
import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import LoadingComponent from '@/components/Loading';
import TopBar from '@/components/TopBar';
import UploadComponent from '@/components/Upload';
import Container from '@/layout/Container';
import { Notification, uuid } from '@/utils';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Content from '../components/Content';
import { rules } from '../rules';
import { newService, NEWS_STATUS, NEWS_TYPE } from '../service';

const NewsFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = React.useState(false);

    const [form] = Form.useForm();
    const image = Form.useWatch('file', form);
    const title = Form.useWatch('title', form);
    const status = Form.useWatch('status', form);

    const fileEdit = React.useRef<any>(null);
    const refContent = React.useRef<any>(null);
    const statusActive = React.useRef<any>(null);

    const handleSubmit = (values: any) => {
        setLoading(true);
        if (id) {
            newService
                .update(+id, { ...values, file: values?.file ? values?.file : '', statusActive: statusActive.current })
                .then((res) => {
                    if (res.status) {
                        Notification('success', 'Cập nhật tin tức thành công');
                        navigate(location?.state?.prevUrl || -1, { state: location.state });
                    }
                })
                .finally(() => setLoading(false));
        } else {
            newService
                .create({ ...values, statusActive: statusActive.current })
                .then((res) => {
                    if (res.status) {
                        Notification('success', 'Thêm tin tức thành công');
                        navigate(location?.state?.prevUrl || -1, { state: location.state });
                    }
                })
                .finally(() => setLoading(false));
        }
    };

    const handleCallbackContent = React.useCallback((content: string) => {
        form.setFieldsValue({ content });
    }, []);

    React.useEffect(() => {
        if (!id) return;
        newService.getDetail(+id).then((res) => {
            if (res.status) {
                form.setFieldsValue(res.data);
                fileEdit.current = [{ url: res.data?.image, uid: uuid(), name: 'img voucher' }];
                refContent.current = res.data?.content;
                statusActive.current = res.data?.statusActive;
            }
        });
    }, [id]);

    return (
        <FormComponent form={form} onSubmit={handleSubmit}>
            <TopBar
                back
                title={id ? `Sửa tin tức * ${title} *` : 'Thêm tin tức'}
                extra={[<SaveButton key="saveNew" htmlType="submit" />]}
            />
            <Container>
                <CardComponent>
                    <Row>
                        {/* col bên trái */}
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập tiêu đề tin tức!'), rules.validateTitle]}
                                    name="title"
                                    label="Tiêu đề tin tức"
                                    inputField={
                                        <Input
                                            disabled={Boolean(id && status === NEWS_STATUS.POST)}
                                            placeholder="Nhập tiêu đề tin tức"
                                        />
                                    }
                                />

                                <FormItemComponent
                                    name="file"
                                    label={
                                        <div>
                                            Ảnh tin tức <span style={{ color: 'red' }}>*</span>
                                        </div>
                                    }
                                    inputField={
                                        <UploadComponent
                                            disabled={Boolean(id && status === NEWS_STATUS.POST)}
                                            // isUploadServerWhenUploading
                                            accept=".png, .jpg, .jpeg"
                                            initialFile={fileEdit.current}
                                            uploadType="list"
                                            listType="picture-card"
                                            maxLength={1}
                                            onSuccessUpload={(url: any) => {
                                                form.setFieldsValue({
                                                    file: url?.originFileObj,
                                                });
                                            }}
                                        >
                                            Tải lên
                                        </UploadComponent>
                                    }
                                />
                            </Row>
                        </Col>

                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng chọn trạng thái tin tức!')]}
                                    name="status"
                                    label="Trạng thái"
                                    inputField={
                                        <Select
                                            disabled={Boolean(id && status === NEWS_STATUS.POST)}
                                            placeholder="Chọn trạng thái"
                                        >
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
                                        <Select
                                            disabled={Boolean(id && status === NEWS_STATUS.POST)}
                                            placeholder="Chọn loại tin tức"
                                        >
                                            <Select.Option value={NEWS_TYPE.BANNER}>Banner</Select.Option>
                                            <Select.Option value={NEWS_TYPE.POLICY}>Chính sách</Select.Option>
                                            <Select.Option value={NEWS_TYPE.TUTORIAL}>Hướng dẫn đặt hàng</Select.Option>
                                        </Select>
                                    }
                                />
                                {status === NEWS_STATUS.POST && (
                                    <FormItemComponent
                                        name="notificationCustomer"
                                        label=" "
                                        valuePropName="checked"
                                        inputField={
                                            <Checkbox disabled={Boolean(id && status === NEWS_STATUS.POST)}>
                                                <strong>Gửi thông báo cho khách hàng </strong>
                                            </Checkbox>
                                        }
                                    />
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <p>Nội dung tin tức</p>
                        <Form.Item wrapperCol={{ span: 24 }} name="content">
                            <Content
                                refContent={refContent.current}
                                handleCallbackContent={handleCallbackContent}
                                image={
                                    image ? URL.createObjectURL(image) : fileEdit.current ? fileEdit.current[0].url : ''
                                }
                                title={title}
                            />
                        </Form.Item>
                    </div>
                </CardComponent>
            </Container>
            {loading && <LoadingComponent />}
        </FormComponent>
    );
};

export default NewsFormPage;
