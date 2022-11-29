import ExportButton from '@/components/Button/Export.Button';
import PrintButton from '@/components/Button/Print.Button';
import CardComponent from '@/components/CardComponent';
import CardContainer from '@/components/CardComponent/Card.Container';
import CardRow from '@/components/CardComponent/Card.Row';
import IconAntd from '@/components/IconAntd';
import PrintTemplate from '@/components/PrintTemplate';
import OrderPrint from '@/components/PrintTemplate/Order.print';
import TableComponent from '@/components/TableComponent';
import TagResult from '@/components/TagResult';
import TopBar from '@/components/TopBar';
import { ORDER_STATE, ORDER_STATUS, PAYMENTSTATUS } from '@/contants';
import Container from '@/layout/Container';
import { currencyFormat, momentParseUtc } from '@/utils';
import { Col, Form, Row, Timeline } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
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
    const returnFilter = React.useCallback(
        (filter: IFilter) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const switchLabel = (historyType: ORDER_STATE) => {
        switch (historyType) {
            case ORDER_STATE.ORDER_TIME:
                return 'Thời gian đặt hàng';
            case ORDER_STATE.CONFIRM:
                return 'Xác nhận đơn hàng';
            case ORDER_STATE.COMPLETED:
                return 'Hoàn thành';
            case ORDER_STATE.CANCELLED:
                return 'Huỷ đơn hàng';
            default:
                return '';
        }
    };

    // print
    const componentRef = React.useRef<any>();

    return (
        <>
            <TopBar
                back
                title={'Đơn hàng ' + order?.code}
                extra={[
                    <ReactToPrint
                        key="print"
                        trigger={() => {
                            return <PrintButton onClick={() => {}} />;
                        }}
                        content={() => componentRef.current}
                    />,
                ]}
            />
            <Container>
                <Row>
                    <Col className="gx-pr-3" xs={24} sm={24} lg={12}>
                        <CardComponent bodyStyle={{ padding: '0 20px 14px' }} title="Thông tin khách hàng    ">
                            <CardRow left="Tên khách hàng" right={order?.user.fullName} />
                            <CardRow left="Số điện thoại" right={order?.user.phoneNumber} />
                        </CardComponent>

                        <CardComponent bodyStyle={{ padding: '0 20px 14px' }} title="Thông tin người nhận hàng">
                            <CardRow left="Tên người nhận" right={order?.shippingName} />
                            <CardRow left="Số điện thoại" right={order?.shippingPhoneNumber} />
                            <CardRow left="Địa chỉ chi tiết" right={order?.shippingAddress} />
                        </CardComponent>
                    </Col>

                    <Col className="gx-p-0" xs={24} sm={24} lg={12}>
                        <CardComponent bodyStyle={{ padding: '0 20px 14px' }} title="Lịch sử đơn hàng">
                            {/* <CardRow
                                left={order?.orderHistory.map((od: any) => )}
                                right={ */}
                            <Timeline mode="left" className="gx-mt-4">
                                {order?.orderHistory.map((od: any) => (
                                    <Timeline.Item key={od.id} label={switchLabel(od.statusKiotviet)}>
                                        {momentParseUtc(order?.createdAt).format('HH:mm DD/MM/YYYY')}
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                            {/* }
                            /> */}
                        </CardComponent>
                    </Col>
                </Row>

                <CardComponent
                    bodyStyle={{ padding: '0 0 30px' }}
                    title={'Thông tin đơn hàng'}
                    extra={
                        <React.Fragment key="status">
                            {order?.status && order?.status === ORDER_STATUS.WAIT_CONFIRMATION ? (
                                <TagResult text="Chờ xác nhận" color="orange" />
                            ) : order?.status === ORDER_STATUS.INPROGRESS ? (
                                <TagResult text="Đang xử lý" color="processing" />
                            ) : order?.status === ORDER_STATUS.COMPLETED ? (
                                <TagResult text="Hoàn thành" color="green" />
                            ) : (
                                <TagResult text="Hủy" color="error" />
                            )}
                        </React.Fragment>
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
                                        order?.paymentStatus && order?.paymentStatus === PAYMENTSTATUS.pending ? (
                                            <TagResult text="Đang chờ" color="processing" />
                                        ) : (
                                            <TagResult text="Đã thanh toán" color="green" />
                                        )
                                    }
                                />

                                <CardRow
                                    left="Trạng thái vận chuyển"
                                    right={
                                        order?.transportStatus ? (
                                            <TagResult text="Đang chờ" color="processing" />
                                        ) : (
                                            <TagResult text="Đang vận chuyển" color="orange" />
                                        )
                                    }
                                />
                            </>
                        }
                        rightCol={
                            <>
                                <CardRow left="Khu vực mua hàng" right={order?.kiotviet?.defaultBranchName} />
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
            <OrderPrint detailOrder={order} ref={componentRef} />
        </>
    );
};

export default OrderDetailPage;
