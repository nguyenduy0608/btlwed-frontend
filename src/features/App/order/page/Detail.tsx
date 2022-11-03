import CardComponent from '@/components/CardComponent';
import CardContainer from '@/components/CardComponent/Card.Container';
import CardRow from '@/components/CardComponent/Card.Row';
import TableComponent from '@/components/TableComponent';
import TagResult from '@/components/TagResult';
import TopBar from '@/components/TopBar';
import { ORDER_STATUS, PAYMENTSTATUS } from '@/contants';
import Container from '@/layout/Container';
import { currencyFormat } from '@/utils';
import { Col, Form, Row } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { IFilter } from '../../voucher/type';
import { columnsProduct, DataTypeOrder } from '../components/Order.Config';
import { OrderService } from '../service';

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
    const orderProduct = data?.data.items;

    const onRowSelection = React.useCallback((row: DataTypeOrder[]) => {
        setRowSelected(row);
    }, []);
    const returnFilter = React.useCallback((filter: IFilter) => {
        setFilterQuery({ ...filterQuery, ...filter });
    }, []);
    return (
        <>
            <TopBar back title={'Đơn hàng ' + order?.code} />
            <Container>
                <Row>
                    <Col className="gx-pr-3" xs={24} sm={24} lg={12}>
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

                    <Col className="gx-p-0" xs={24} sm={24} lg={12}>
                        <>
                            <CardComponent title="Lịch sử đơn hàng">
                                {order?.status && order?.status === ORDER_STATUS.WAIT_CONFIRMATION ? (
                                    <CardRow left="Thời gian đặt hàng" right={order?.code} />
                                ) : order?.status === ORDER_STATUS.COMPLETED ? (
                                    <>
                                        <CardRow left="Thời gian đặt hàng" right={order?.code} />
                                        <CardRow left="Xác nhận đơn hàng" right={order?.code} />
                                        <CardRow left="Hoàn thành" right={order?.code} />
                                    </>
                                ) : order?.status === ORDER_STATUS.INPROGRESS ? (
                                    <>
                                        <CardRow left="Thời gian đặt hàng" right={order?.code} />
                                        <CardRow left="Xác nhận đơn hàng" right={order?.code} />
                                    </>
                                ) : (
                                    <>
                                        <CardRow left="Thời gian đặt hàng" right={order?.code} />
                                        <CardRow left="Xác nhận đơn hàng" right={order?.code} />
                                        <CardRow left="Hủy đơn hàng" right={order?.code} />
                                        <CardRow left="Lý do hủy đơn" right={order?.code} />
                                    </>
                                )}
                            </CardComponent>
                        </>
                    </Col>
                </Row>

                <CardComponent
                    title={'Thông tin đơn hàng'}
                    extra={
                        order?.status && order?.status === ORDER_STATUS.WAIT_CONFIRMATION ? (
                            <TagResult text="Chờ xác nhận" color="orange" />
                        ) : order?.status === ORDER_STATUS.INPROGRESS ? (
                            <TagResult text="Đang xử lý" color="processing" />
                        ) : order?.status === ORDER_STATUS.COMPLETED ? (
                            <TagResult text="Hoàn thành" color="green" />
                        ) : (
                            <TagResult text="Hủy" color="error" />
                        )
                    }
                >
                    <CardContainer
                        leftCol={
                            <>
                                <CardRow left="Mã đơn hàng" right={order?.code} />
                                <CardRow left="Sản phẩm" right={order?.items.length + ' sản phẩm'} />
                                <CardRow left="Hình thức thanh toán" right={order?.paymentMethod} />
                                <CardRow
                                    left="Trạng thái thanh toán"
                                    right={
                                        order?.paymentStatus && order?.paymentStatus === PAYMENTSTATUS.pending
                                            ? 'Đang chờ'
                                            : 'Đã thanh toán'
                                    }
                                />

                                <CardRow
                                    left="Trạng thái vận chuyển"
                                    right={order?.transportStatus ? 'Đang chờ' : 'Đang vận chuyển'}
                                />
                            </>
                        }
                        rightCol={
                            <>
                                <CardRow left="Khu vực mua hàng" right={order?.shippingAddress} />
                                <CardRow left="Tổng tiền" right={currencyFormat(order?.total) + 'đ'} />
                                <CardRow
                                    left="Tổng tiền giảm(Điểm tích lũy)"
                                    right={currencyFormat(order?.totalDiscount) + 'đ'}
                                />
                                <CardRow
                                    left="Tổng tiền giảm(Voucher)"
                                    right={currencyFormat(order?.totalDiscount) + 'đ'}
                                />
                                <CardRow
                                    left="Tổng tiền thanh toán"
                                    right={currencyFormat(order?.totalPayment) + 'đ'}
                                />
                            </>
                        }
                        title=""
                    />
                </CardComponent>
                <CardComponent title="Danh sách sản phẩm">
                    <TableComponent
                        page={page}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        onRowSelection={onRowSelection}
                        dataSource={order ? order?.items : []}
                        columns={columnsProduct(page)}
                        total={order && order?.paging?.totalItemCount}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default OrderDetailPage;
