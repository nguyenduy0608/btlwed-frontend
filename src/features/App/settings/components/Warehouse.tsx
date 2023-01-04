import IconAntd from '@/components/IconAntd';
import TableComponent from '@/components/TableComponent';
import useCallContext from '@/hooks/useCallContext';
import { Notification } from '@/utils';
import { Button, Popconfirm, Row } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { WarehouseService } from '../service';
import { WarehouseColumns } from './Setting.Config';
import WarehouseFormPage from './WarehouseForm';
const initialFilterQuery = {};
const initialValue = {};
const Warehouse = ({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: any }) => {
    const { state } = useCallContext();

    const navigate = useNavigate();

    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [values, setValues] = React.useState<any>(null);

    const {
        data: warehouse,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery<any>(['warehouseService', page, filterQuery], () => WarehouseService.get({ page, ...filterQuery }));

    const handleShowModal = (record: any) => {
        setValues({
            retailer: record?.kiotvietId,
            name: {
                value: record?.kiotvietBranchesId,
            },
        });
        setModalVisible(true);
    };
    const handleCloseForm = React.useCallback((trick = '') => {
        setValues(null);
        setModalVisible(false);
        if (trick === 'notRefresh') return;
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TableComponent
                loading={isRefetching || isLoading}
                page={page}
                rowSelect={false}
                onChangePage={(_page) => setPage(_page)}
                dataSource={warehouse?.data}
                columns={[
                    ...WarehouseColumns(page),
                    {
                        title: 'Thao tác',
                        dataIndex: 'action',
                        align: 'center',
                        width: 120,
                        render: (_, record: any) => (
                            <Row justify="center">
                                <Button
                                    icon={<IconAntd icon="EditOutlined" />}
                                    onClick={() => {
                                        handleShowModal(record);
                                    }}
                                />

                                <Popconfirm
                                    onConfirm={() => {
                                        WarehouseService.delete(record.id).then(() => {
                                            refetch();
                                            Notification('success', 'Xoá kho hàng thành công');
                                        });
                                    }}
                                    title="Bạn có chắc chắn muốn xoá?"
                                >
                                    <Button icon={<IconAntd icon="DeleteOutlined" />} />
                                </Popconfirm>
                            </Row>
                        ),
                    },
                ]}
                total={warehouse?.paging?.totalItemCount || 0}
            />
            <WarehouseFormPage modalVisible={modalVisible} values={values} handleCloseForm={handleCloseForm} />
        </>
    );
};
export default Warehouse;
