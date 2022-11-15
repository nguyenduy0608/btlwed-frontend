import CardComponent from '@/components/CardComponent';
import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import TableComponent from '@/components/TableComponent';
import { DefaultSelectStyled } from '@/config/global.style';
import { routerPage } from '@/config/routes';
import { columns } from '@/features/App/order/components/Order.Config';
import { Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { settingService } from '../../service';

const OrderTab = ({ kiotvietId }: { kiotvietId: number }) => {
    const [filterQuery, setFilterQuery] = React.useState({});
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();

    const {
        data: orders,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery<any>(['settingOrderService', page, filterQuery], () =>
        settingService.getOrderByKiotViet(kiotvietId, { page, ...filterQuery })
    );

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    return (
        <CardComponent
            title={
                <div className="gx-pl-4" style={{ fontSize: '14px' }}>
                    Kết quả lọc: <strong>{orders?.paging?.totalItemCount || 0}</strong>
                </div>
            }
            extra={[
                <Space className="gx-mr-4" size="middle" wrap>
                    <SearchInput
                        style={{ minWidth: '140px' }}
                        onChangeSearch={(search) => returnFilter({ search })}
                        placeholderSearch="Nhập mã đơn, tên khách hàng, số điện thoại khách hàng"
                    />
                    <DefaultSelectStyled
                        placeholder="Trạng thái"
                        allowClear
                        style={{ width: '160px' }}
                        defaultValue={null}
                        onChange={(value) => returnFilter({ status: value })}
                    >
                        <DefaultSelectStyled.Option value={'inprogress'}>Đang xử lý</DefaultSelectStyled.Option>
                        <DefaultSelectStyled.Option value={'wait_confirmation'}>
                            Chờ xác nhận
                        </DefaultSelectStyled.Option>
                        <DefaultSelectStyled.Option value={'completed'}>Hoàn thành</DefaultSelectStyled.Option>
                        <DefaultSelectStyled.Option value={'cacelled'}>Hủy</DefaultSelectStyled.Option>
                    </DefaultSelectStyled>

                    <RangerPicker
                        name="dateFilter"
                        onChange={(name: string, value: string) => {
                            returnFilter({ createFrom: value.split(',')[0], createTo: value.split(',')[1] });
                        }}
                    />
                </Space>,
            ]}
        >
            <TableComponent
                loading={isLoading || isRefetching}
                page={page}
                onRowClick={(record: { id: number }) => navigate(`${routerPage.order}/${record.id}`)}
                rowSelect={false}
                onChangePage={(_page) => setPage(_page)}
                dataSource={orders ? orders.data : []}
                columns={columns(page)}
                total={orders?.paging?.totalItemCount || 0}
            />
        </CardComponent>
    );
};

export default OrderTab;
