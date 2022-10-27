import CardComponent from '@/components/CardComponent';
import CardContainer from '@/components/CardComponent/Card.Container';
import CardRow from '@/components/CardComponent/Card.Row';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { OrderService } from '../service';
import { currencyFormat } from '@/utils';
import TagResult from '@/components/TagResult';
import TableComponent from '@/components/TableComponent';
import { Button, Col, Form, InputNumber, Row, Segmented, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { TitleCardDes } from '@/config/global.style';
import { columnsProduct, DataTypeOrder } from '../components/Order.Config';
import { ProductService } from '../../product/service';

const initialFilterQuery = {};
const OrderDetailPage = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState(initialFilterQuery);
    const [loadingModal, setLoadingModal] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [rowSelected, setRowSelected] = React.useState<DataTypeOrder[] | []>([]);
    const [form] = Form.useForm();
    const { id } = useParams();
    const { data, isLoading, refetch, isRefetching } = useQuery<any>(['detailOrder', id], () =>
        OrderService.detail(id)
    );
    const order = data?.data;
    const {
        data: Product,
        //  isLoading,
        //  refetch,
        //  isRefetching,
    } = useQuery<any>(['ProductService', page, filterQuery], () => ProductService.get({ page, ...filterQuery }));

    const onRowSelection = React.useCallback((row: DataTypeOrder[]) => {
        setRowSelected(row);
    }, []);
    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);
    return (
        <>
            <TopBar back title={order?.fullName} />
            <Container>
                <Row>
                    <Col span={12}>
                        <>
                            <CardComponent title="Thông tin khách hàng    ">
                                <CardRow left="Tên khách hàng" right={order?.user.fullName} />
                                <CardRow left="Số điện thoại" right={order?.user.phoneNumber} />
                            </CardComponent>
                        </>

                        <>
                            <CardComponent title="Thông tin người nhận hàng">
                                <CardRow left="Tên người nhận" right={order?.user.fullName} />
                                <CardRow left="Số điện thoại" right={order?.user.phoneNumber} />
                                <CardRow left="Địa chỉ chi tiết" right={order?.user.address} />
                            </CardComponent>
                        </>
                    </Col>

                    <Col span={12}>
                        <>
                            <CardComponent title="Lịch sử đơn hàng">
                                <CardRow left="Thời gian đặt hàng" right={order?.code} />
                            </CardComponent>
                        </>
                    </Col>
                </Row>
                <CardComponent>
                    <CardContainer
                        leftCol={
                            <>
                                <CardRow left="Mã đơn hàng" right={order?.code} />
                                <CardRow left="Sản phẩm" right={order?.code} />
                                <CardRow left="Hình thức thanh toán" right={'Chưa có api'} />
                                <CardRow
                                    left="Trạng thái thanh toán"
                                    right={
                                        order?.paymentStatus ? (
                                            <TagResult text="Đang chờ" color="error" />
                                        ) : (
                                            <TagResult text="Đã thanh toán" color="processing" />
                                        )
                                    }
                                />
                            </>
                        }
                        rightCol={
                            <>
                                <CardRow left="Khu vực mua hàng" right={order?.code} />
                                <CardRow left="Tổng tiền" right={currencyFormat(order?.total) + 'đ'} />
                                <CardRow left="Tổng tiền giảm(Điểm tích lũy)" right={order?.total || 0} />
                                <CardRow left="Tổng tiền giảm(Voucher)" right={order?.total} />
                                <CardRow left="Tổng tiền thanh toán" right={order?.totalPayment} />
                            </>
                        }
                        title="Thông tin đơn hàng"
                    />
                </CardComponent>
                <CardComponent title="Danh sách sản phẩm">
                    <TableComponent
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        onRowSelection={onRowSelection}
                        dataSource={Product ? Product.data : []}
                        columns={columnsProduct(page)}
                        total={Product && Product?.paging?.totalItemCount}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default OrderDetailPage;
