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
import { ORDERSTATUS, PAYMENTSTATUS } from '@/contants';

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
    console.log('🚀 ~ file: Detail.tsx ~ line 33 ~ OrderDetailPage ~ order', order);
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
                                {order?.status && order?.status === ORDERSTATUS.wait_confirmation ? (
                                    <CardRow left="Thời gian đặt hàng" right={order?.code} />
                                ) : order?.status === ORDERSTATUS.completed ? (
                                    <>
                                        <CardRow left="Thời gian đặt hàng" right={order?.code} />
                                        <CardRow left="Xác nhận đơn hàng" right={order?.code} />
                                        <CardRow left="Hoàn thành" right={order?.code} />
                                    </>
                                ) : order?.status === ORDERSTATUS.inprogress ? (
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
                        order?.status && order?.status === ORDERSTATUS.wait_confirmation ? (
                            <TagResult text="Chờ xác nhận" color="orange" />
                        ) : order?.status === ORDERSTATUS.inprogress ? (
                            <TagResult text="Đang xử lý" color="processing" />
                        ) : order?.status === ORDERSTATUS.completed ? (
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
                                <CardRow left="Sản phẩm" right={order?.items.length+ ' sản phẩm'} />
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
