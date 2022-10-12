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
const VoucherPage = () => {
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
                    <Button className="gx-mb-0" type="primary">
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
                                <div>
                                    <Switch checked={!loading} onChange={onChange} />
                                    Đang hoạt động
                                </div>,
                                <div style={{ marginTop: '12px' }}>
                                    <EditOutlined key="edit" />
                                    Chỉnh sửa
                                </div>,
                                <div>
                                    <DeleteOutlined key="delete" />
                                    Xóa
                                </div>,
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
