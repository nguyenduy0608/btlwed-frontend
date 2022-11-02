import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import ModalComponent from '@/components/ModalComponent';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Notification, wait } from '@/utils';
import { Button, Form, InputNumber, Row, Segmented, Space } from 'antd';
import Input from 'antd/lib/input/Input';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { rules } from '../../voucher/rules';
import Description from '../components/Description';
import { columns, DataTypeProductCategory } from '../components/Product.Config';
import { CategoryService } from '../service';
import Filter from '../components/Filter.Category';
import useCallContext from '@/hooks/useCallContext';
import { selectAll } from '@/service';
const initialFilterQuery = {};

const initialValue = {
    name: '',
    order: '',
};

const ProductCategoryPage = () => {
    const { state, dispatch } = useCallContext();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [rowSelected, setRowSelected] = React.useState<DataTypeProductCategory[] | []>([]);
    const [page, setPage] = React.useState(1);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [values, setValues] = React.useState<DataTypeProductCategory | null>(null);
    const [form] = Form.useForm();

    const {
        data: category,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['CategoryService', page, filterQuery], () => CategoryService.get({ page, ...filterQuery }));

    const handleShowModal = (record: DataTypeProductCategory) => {
        setModalVisible(true);
        setValues(record);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setValues(null);
        formReset();
    };
    const formReset = () => {
        form.setFieldsValue(initialValue);
    };

    React.useEffect(() => {
        if (values) {
            setLoadingModal(true);
            form.setFieldsValue(values || initialValue);
            wait(500).then(() => setLoadingModal(false));
        }
    }, [values]);
    const handleSubmit = React.useCallback(
        async (data: DataTypeProductCategory) => {
            setLoadingModal(true);
            if (values) {
                console.log('values:', values);
                const res = await CategoryService.update(values.id, { order: data.order });
                if (res.status === 1) {
                    refetch();
                    Notification('success', 'Cập nhật danh mục thành công');
                    handleCloseModal();
                    formReset();
                }
            }

            setLoadingModal(false);
        },
        [values]
    );
    const onRowSelection = React.useCallback((row: DataTypeProductCategory[]) => {
        setRowSelected(row);
    }, []);
    const rowRender = (record: DataTypeProductCategory, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description record={record} handleShowModal={() => handleShowModal(record)} refetch={refetch} />;
    };

    const returnFilter = React.useCallback((filter: any) => {
        setPage(1);
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);

    return (
        <>
            <TopBar
                title="Danh mục sản phẩm"
                extra={
                    <Segmented
                        onChange={(value) => setFilterQuery({ ...filterQuery, kiotvietId: value })}
                        options={[
                            selectAll,
                            ...((state?.kiotviets?.map((kiot) => ({ label: kiot.name, value: kiot.id })) || []) as any),
                        ]}
                    />
                }
            />
            <Container>
                <CardComponent extra={[<Filter returnFilter={returnFilter} key="filter" />]}>
                    <TableComponent
                        loading={isRefetching || loadingModal || isLoading}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
                        onRowSelection={onRowSelection}
                        dataSource={category?.data}
                        columns={columns(page)}
                        total={category && category?.paging?.totalItemCount}
                    />

                    <ModalComponent title="Cập nhật danh mục" modalVisible={modalVisible} loading={loadingModal}>
                        <FormComponent
                            layoutType="vertical"
                            form={form}
                            initialValues={initialValue}
                            onSubmit={handleSubmit}
                        >
                            <Row gutter={[20, 0]}>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập tên danh mục!')]}
                                    name="name"
                                    label="Tên danh mục"
                                    inputField={<Input disabled={true} />}
                                />
                                <FormItemComponent
                                    rules={[{ required: true, message: 'Vui lòng nhập số thứ tự hiển thị!' }]}
                                    name="order"
                                    label="STT hiển thị"
                                    inputField={
                                        <InputNumber
                                            min={0}
                                            max={99}
                                            style={{ width: '100%' }}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
                                            placeholder="Nhập số thứ tự hiển thị"
                                        />
                                    }
                                />
                            </Row>
                            <Row style={{ width: '100%' }} align="bottom">
                                <Space>
                                    <Button type="default" onClick={handleCloseModal}>
                                        Thoát
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Lưu
                                    </Button>
                                </Space>
                            </Row>
                        </FormComponent>
                    </ModalComponent>
                </CardComponent>
            </Container>
        </>
    );
};

export default ProductCategoryPage;
