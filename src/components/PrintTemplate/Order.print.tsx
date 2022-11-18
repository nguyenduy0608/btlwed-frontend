import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import './style/order.style.css';

const RowInfo: React.FC<{ left: any; right: any }> = React.memo(({ left, right }) => {
    return (
        <div className="gx-mx-5 gx-mt-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="s6 left">{left}</div>
            <div className="s6 right">{right}</div>
        </div>
    );
});

const OrderPrint = React.forwardRef((detailOrder?: any, ref?: any) => {
    return (
        <div className="order_print" ref={ref}>
            <Row className="s1" justify="space-between">
                <div>{moment().format('DD/MM/YYYY, HH:mm')}</div>
                <div>Giao dịch - Hóa đơn</div>
            </Row>
            <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
            </p>
            <h2 className="title_info">CÔNG TY CỔ PHẦN STAKA (Khánh Anh)</h2>
            <h2 className="title_info">Địa chỉ: - Đường Phú Định - Phường 16 - Quận 8 - Thành phố Hồ Chí Minh</h2>
            <h2 className="title_info">SĐT: 0867 484 186 - 0789 0187 89</h2>
            <h2 className="title_info">CTK: Đinh Quốc Ngọ</h2>
            <h2 className="title_info">220226868-(MB Bank),CN.Hồng Lĩnh-Hà Tĩnh</h2>
            <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
            </p>
            <h1 className="title_info">HÓA ĐƠN BÁN HÀNG</h1>
            <h4 className="title_info">Số: HD001302</h4>
            <Row className="gx-mx-5">
                <Col span={14}>
                    <p className="s2">
                        Tên khách hàng: <span className="gx-font-weight-bold">Shop Máy Nhật Bãi - Biên Hòa </span>
                    </p>
                </Col>
                <Col span={10}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        <span className="s3">SĐT: 0933.729.380</span>
                    </p>
                </Col>
                <Col span={14}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        Địa chỉ: -
                    </p>
                </Col>
                <Col span={10}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        Ngày lập hóa đơn: 15/11/2022 11:08
                    </p>
                </Col>
                <Col span={14}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        Khu vực:-
                    </p>
                </Col>
                <Col span={10}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        NVBH: THU HẰNG
                    </p>
                </Col>
            </Row>

            <p style={{ textIndent: '0pt' }}>
                <br />
            </p>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <table style={{ borderCollapse: 'collapse' }} cellSpacing={0}>
                    <tbody>
                        <tr style={{ height: '17pt' }}>
                            <td
                                style={{
                                    width: '27pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#2B2B2B',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#2B2B2B',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#808080',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s4"
                                    style={{
                                        paddingTop: '1pt',

                                        textIndent: '0pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    STT
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '83pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#2B2B2B',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#808080',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s4"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingLeft: '21pt',
                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    Mã hàng
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '180pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#2B2B2B',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#808080',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s4"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingLeft: '67pt',
                                        paddingRight: '67pt',
                                        textIndent: '0pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Tên hàng
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '30pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#2B2B2B',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#808080',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s4"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingLeft: '3pt',
                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    ĐVT
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '50pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#2B2B2B',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#808080',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s4"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingRight: '4pt',
                                        textIndent: '0pt',
                                        textAlign: 'right',
                                    }}
                                >
                                    Số lượng
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '73pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#2B2B2B',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#808080',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s4"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingLeft: '19pt',
                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    Đơn giá
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '84pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#2B2B2B',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#808080',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#2B2B2B',
                                }}
                            >
                                <p
                                    className="s4"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingLeft: '17pt',
                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    Thành tiền
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '17pt' }}>
                            <td
                                style={{
                                    width: '27pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#808080',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#2B2B2B',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#2B2B2B',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p className="s5" style={{ paddingTop: '1pt', textIndent: '0pt', textAlign: 'center' }}>
                                    1
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '83pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#808080',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#2B2B2B',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s5"
                                    style={{
                                        paddingTop: '1pt',

                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    KBPO11CTKPS
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '180pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#808080',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#2B2B2B',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s5"
                                    style={{
                                        paddingTop: '1pt',

                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    Khẩu bộ phá ốc 11CT Kapusi K-3689
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '30pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#808080',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#2B2B2B',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                                    <br />
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '50pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#808080',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#2B2B2B',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s5"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingRight: '1pt',
                                        textIndent: '0pt',
                                        textAlign: 'right',
                                    }}
                                >
                                    10
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '73pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#808080',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#2B2B2B',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#808080',
                                }}
                            >
                                <p
                                    className="s5"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingLeft: '36pt',
                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    284,600
                                </p>
                            </td>
                            <td
                                style={{
                                    width: '84pt',
                                    borderTopStyle: 'solid',
                                    borderTopWidth: '1pt',
                                    borderTopColor: '#808080',
                                    borderLeftStyle: 'solid',
                                    borderLeftWidth: '1pt',
                                    borderLeftColor: '#808080',
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1pt',
                                    borderBottomColor: '#2B2B2B',
                                    borderRightStyle: 'solid',
                                    borderRightWidth: '1pt',
                                    borderRightColor: '#2B2B2B',
                                }}
                            >
                                <p
                                    className="s5"
                                    style={{
                                        paddingTop: '1pt',
                                        paddingLeft: '39pt',
                                        textIndent: '0pt',
                                        textAlign: 'left',
                                    }}
                                >
                                    2,846,000
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                </p>

                <div style={{ width: '100%' }}>
                    <RowInfo left="Tổng tiền toa hàng:" right="2,846,000" />
                    <RowInfo left="Phần trăm chiết khấu hóa đơn:" right="20%" />
                    <RowInfo left="Chiết khấu hóa đơn:" right="596,200" />
                    <RowInfo left="Tổng tiền hàng trừ chiết khấu hóa đơn:" right="2,276,800" />
                    <RowInfo left="Nợ cũ:" right="0" />
                    <RowInfo left="Khách hàng thanh toán:" right="0" />
                    <RowInfo left="Nợ sau hoá đơn:" right="2,276,800" />
                    <RowInfo left="Tổng nợ hiện tại:" right="2,276,800" />
                    <RowInfo left="Số tiền còn phải thanh toán là:" right="2,276,800" />
                </div>

                <div>
                    <p
                        className="s8"
                        style={{ paddingTop: '10pt', padding: '0 18pt', textIndent: '0pt', textAlign: 'left' }}
                    >
                        Bằng chữ: <i>Hai triệu hai trăm bảy mươi sáu nghìn tám trăm đồng chẵn</i>
                    </p>
                    <p style={{ paddingTop: '8pt', padding: '0 18pt', textIndent: '0pt', textAlign: 'left' }}>
                        Lưu ý: Khách hàng nhận hàng, kiểm hàng, có gì thắc măc thì phản hồi lại cho công ty Khánh Anh
                        trong vòng 03 ngày kể từ ngày nhận hàng.
                    </p>
                    <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                        <br />
                    </p>
                    <p style={{ padding: '0 18pt', textIndent: '0pt', textAlign: 'left' }}>
                        Thời hạn đổi trả hàng trong vòng 30 ngày kể từ ngày nhận hàng. Sau thời gian đó, công ty Khánh
                        Anh không nhận trả lại hàng.
                    </p>
                    <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                        <br />
                    </p>
                </div>
                <table style={{ borderCollapse: 'collapse' }} cellSpacing={0}>
                    <tbody>
                        <tr style={{ height: '13pt' }}>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '1pt',
                                        paddingRight: '43pt',
                                        textIndent: '0pt',
                                        lineHeight: '12pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Người mua hàng
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '43pt',
                                        paddingRight: '50pt',
                                        textIndent: '0pt',
                                        lineHeight: '12pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Người bán hàng
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '50pt',
                                        paddingRight: '1pt',
                                        textIndent: '0pt',
                                        lineHeight: '12pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Người kiểm soát
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '13pt' }}>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '1pt',
                                        paddingRight: '43pt',
                                        textIndent: '0pt',
                                        lineHeight: '11pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    (Ký, họ tên)
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '43pt',
                                        paddingRight: '50pt',
                                        textIndent: '0pt',
                                        lineHeight: '11pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    (Ký, họ tên)
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '50pt',
                                        paddingRight: '1pt',
                                        textIndent: '0pt',
                                        lineHeight: '11pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    (Ký, họ tên,đóng dấu)
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
            </p>
        </div>
    );
});

export default OrderPrint;
