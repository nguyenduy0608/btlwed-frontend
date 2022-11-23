import CardComponent from '@/components/CardComponent';
import IconAntd from '@/components/IconAntd';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { selectAll } from '@/service';
import { momentToStringDate, Notification, wait } from '@/utils';
import { Form, message, Segmented, Switch } from 'antd';
import Input from 'antd/lib/input/Input';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import Description from '../components/Description';
import Filter from '../components/Filter.Category';
import { columns, DataTypeProductCategory } from '../components/Product.Config';
import { CategoryService } from '../service';

const initialFilterQuery = {};

const initialValue = {
    name: '',
    order: '',
};

const DragHandle = SortableHandle(() => <IconAntd icon="DragOutlined" style={{ cursor: 'grab', color: '#999' }} />);

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />);
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />);

const ProductCategoryPage = () => {
    const { state, dispatch } = useCallContext();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
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

    React.useEffect(() => {
        refetch();
    }, [state.syncLoading]);

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

    const rowRender = (record: DataTypeProductCategory, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description record={record} handleShowModal={() => handleShowModal(record)} refetch={refetch} />;
    };

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const onSortEnd = ({ oldIndex, newIndex, ...props }: SortEnd) => {
        if (oldIndex !== newIndex) {
            if (!category?.data?.[oldIndex]?.id || !category?.data?.[newIndex]?.id)
                return message.error('Không thể sắp xếp danh mục này');

            CategoryService.update(category?.data?.[oldIndex]?.id, {
                order:
                    oldIndex > newIndex
                        ? +category?.data?.[newIndex + 1]?.order - 1 <= 0
                            ? 1
                            : +category?.data?.[newIndex + 1]?.order - 1
                        : +category?.data?.[newIndex]?.order,
            }).then(() => {
                message.success('Thay đổi thứ tự thành công');
                refetch();
            });
        }
    };

    const DraggableContainer = (props: SortableContainerProps) => {
        return (
            <SortableBody useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
        );
    };

    const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = category?.data?.findIndex((x: any) => x.id === restProps['data-row-key']);
        return (
            <SortableItem
                className={className}
                style={style}
                index={index || Math.floor(Math.random())}
                {...restProps}
            />
        );
    };

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
                <CardComponent title={<Filter returnFilter={returnFilter} key="filter" />}>
                    <TableComponent
                        showTotalResult
                        loading={isLoading}
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        expandedRowRender={rowRender}
                        dataSource={category?.data || []}
                        components={{
                            body: {
                                wrapper: DraggableContainer,
                                row: DraggableBodyRow,
                            },
                        }}
                        columns={[
                            {
                                title: '',
                                dataIndex: 'sort',
                                width: 30,
                                className: 'drag-visible',
                                render: () => <DragHandle />,
                            },
                            ...columns(page),
                            {
                                title: 'Thứ tự hiển thị',
                                dataIndex: 'order',
                                align: 'center',
                                width: 200,
                                render: (value: any, row: any) => (
                                    <div
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Input
                                            min={1}
                                            onBlur={(e) => {
                                                if (+e.target.value <= 0)
                                                    return Notification('warning', 'Thứ tự phải lớn hơn 0');

                                                if (+e.target.value === +value) return;
                                                CategoryService.update(row.id, { order: e.target.value }).then(() => {
                                                    message.success('Thay đổi thứ tự thành công');

                                                    refetch();
                                                });
                                            }}
                                            defaultValue={value}
                                        />
                                    </div>
                                ),
                            },
                            {
                                title: 'Ngày tạo',
                                dataIndex: 'createdAt',
                                align: 'center',
                                render: (value: any) => momentToStringDate(value),
                            },
                            {
                                title: 'Trạng thái',
                                dataIndex: 'status',
                                align: 'center',
                                width: 40,
                                render: (value: number, row: any) => (
                                    <div
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Switch
                                            onChange={(value) => {
                                                CategoryService.changeStatus(row.id, value).then(() => {
                                                    message.success('Cập nhật trạng thái thành công');
                                                    refetch();
                                                });
                                            }}
                                            defaultChecked={!!value}
                                        />
                                    </div>
                                ),
                            },
                        ]}
                        total={category && category?.paging?.totalItemCount}
                    />

                    {/* <ModalComponent title="Cập nhật danh mục" modalVisible={modalVisible} loading={loadingModal}>
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
                                    <SaveButton htmlType="submit" />
                                </Space>
                            </Row>
                        </FormComponent>
                    </ModalComponent> */}
                </CardComponent>
            </Container>
        </>
    );
};

export default ProductCategoryPage;
