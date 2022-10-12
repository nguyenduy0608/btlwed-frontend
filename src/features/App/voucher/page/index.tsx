import React, { useState } from 'react';
import TableComponent from '@/components/TableComponent';
import { Button, Card, DatePicker, Descriptions, Input, Segmented, Switch } from 'antd';
import { dataSourceVoucher, columnsVoucher } from '../components/Voucher.Config';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import TopBar from '@/components/TopBar';
import CardComponent from '@/components/CardComponent';
import { PADDING } from '@/config/theme';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { routerPage } from '@/config/routes';
const VoucherPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { RangePicker } = DatePicker;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const dateFormat = 'DD/MM/YYYY';
    const onChange = (checked: boolean) => {
        setLoading(!checked);
    };
    return (
        <Container>
            <TopBar
                title="Quản lý voucher"
                extra={
                    <Button onClick={() => navigate(routerPage.voucherForm)} className="gx-mb-0" type="primary">
                        Thêm mới
                    </Button>
                }
            />
            <CardComponent
                title=""
                extra={[
                    <RangePicker
                        defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                        format={dateFormat}
                    />,
                ]}
            >
                <TableComponent
                    page={1}
                    rowSelect={false}
                    onChangePage={(_page) => console.log(_page)}
                    expandedRowRender={(row: any) => (
                        <Card
                            className="gx-mb-0"
                            actions={[
                                <Button
                                    type="text"
                                    className="gx-mb-0"
                                    style={{
                                        fontSize: '16px',
                                        color: '#0090FF',
                                    }}
                                >
                                    <Switch checked={!loading} onChange={onChange} style = {{margin:'0 8px 2px 0'}}/>
                                    Đang hoạt động
                                </Button>,
                                <Button
                                    type="text"
                                    className="gx-mb-0"
                                    style={{
                                        fontSize: '16px',
                                        color: 'green',
                                    }}
                                >
                                    <EditOutlined key="edit" />
                                    Chỉnh sửa
                                </Button>,
                                <Button
                                    type="text"
                                    className="gx-mb-0"
                                    style={{
                                        fontSize: '16px',
                                        color: 'red',
                                    }}
                                >
                                    <DeleteOutlined key="delete" />
                                    Xóa
                                </Button>,
                            ]}
                        >
                            <Descriptions title="Thông tin mã giảm giá" column={2}>
                                <Descriptions.Item label="Mã voucher">KM001</Descriptions.Item>
                                <Descriptions.Item label="Ngày bắt đầu">19/07/2020</Descriptions.Item>
                                <Descriptions.Item label="Tên voucher">Mua hóa đơn 10tr giảm 2%</Descriptions.Item>
                                <Descriptions.Item label="Ngày kết thúc">20/08/2010</Descriptions.Item>
                                <Descriptions.Item label="Số lượng quy định">20</Descriptions.Item>
                                <Descriptions.Item label="Số lượng còn lại">10</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    )}
                    columns={columnsVoucher}
                    dataSource={dataSourceVoucher}
                    total={dataSourceVoucher.length}
                />
            </CardComponent>
        </Container>
    );
};

const Container = styled.div`
    padding: ${PADDING};
`;
export default VoucherPage;
