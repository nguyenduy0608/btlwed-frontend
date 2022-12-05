import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import IconAntd from '@/components/IconAntd';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { selectAll } from '@/service';
import { handleObjectEmpty, momentToStringDate, Notification, wait } from '@/utils';
import { InputNumber, message, Segmented, Switch } from 'antd';
import Input from 'antd/lib/input/Input';
import React from 'react';
import { useQuery } from 'react-query';
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
    const { state } = useCallContext();

    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);

    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    const {
        data: category,
        refetch,
        isRefetching,
    } = useQuery<any>(['CategoryService', page, filterQuery], () => CategoryService.get({ page, ...filterQuery }));

    React.useEffect(() => {
        refetch();
    }, [state.syncLoading]);

    const rowRender = (record: DataTypeProductCategory, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        return <Description record={record} refetch={refetch} />;
    };

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
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

    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery(initialFilterQuery);
            setPage(1);
            setLoadingClearFilter(false);
        });
    };

    return (
        <>
            <TopBar
                title="Danh mục sản phẩm"
                extra={
                    <Segmented
                        onChange={(value) => {
                            setPage(1);
                            setFilterQuery({ ...filterQuery, kiotvietId: value });
                        }}
                        options={[
                            selectAll,
                            ...((state?.kiotviets?.map((kiot) => ({ label: kiot.name, value: kiot.id })) || []) as any),
                        ]}
                    />
                }
            />
            <Container>
                <CardComponent
                    title={
                        loadingClearFilter ? (
                            <ClearFilterLoading key="clear_filter" />
                        ) : (
                            <Filter returnFilter={returnFilter} key="filter" />
                        )
                    }
                >
                    <TableComponent
                        reLoadData={() => refetch()}
                        showTotalResult
                        loading={isRefetching}
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
                                        <InputNumber
                                            min={1}
                                            max={10000000}
                                            onBlur={(e) => {
                                                if (!e.target.value || isNaN(+e.target.value) || +e.target.value < 1)
                                                    return;

                                                if (+e.target.value <= 0)
                                                    return Notification('warning', 'Thứ tự phải lớn hơn 0');

                                                if (+e.target.value === +value) return;
                                                CategoryService.update(row.id, { order: e.target.value }).then(() => {
                                                    message.success('Thay đổi thứ tự thành công');

                                                    refetch();
                                                });
                                            }}
                                            style={{ width: '100%' }}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                            value={value}
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
                </CardComponent>
            </Container>
            <ClearFilter
                hidden={
                    Object.values(handleObjectEmpty(filterQuery))?.filter(
                        (item: any) => item !== undefined && item !== ''
                    ).length > 0
                }
                onClick={onClearFilter}
            />
        </>
    );
};

export default ProductCategoryPage;
