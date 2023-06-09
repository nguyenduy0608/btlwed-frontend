import React from 'react';
import { Avatar, Card, Col, Descriptions, Image, Row } from 'antd';
import Buttons from './Buttons';
import { DataTypeAccount } from './Account.Config';
import { momentToStringDate } from '@/utils';
import styled from 'styled-components';
import { BOX_SHADOW } from '@/config/theme';
import { ADMIN } from '@/contants';
interface IProps {
    record: DataTypeAccount;
    refetch: any;
    handleShowModal?: (record: DataTypeAccount) => void;
}
const ROLE = (value: string) => {
    switch (value) {
        case ADMIN.main:
            return 'Admin';

        case ADMIN.employee:
            return 'Kế toán';
        default:
            return '';
    }
};
const Description: React.FC<IProps> = ({ record, refetch, handleShowModal }) => {
    return (
        <Card className="gx-mb-0" actions={Buttons({ record, handleShowModal, refetch })}>
            <Row>
                <Col span={24}>
                    <Descriptions title="Thông tin tài khoản" column={2}>
                        <Descriptions.Item label="Tên người dùng">{record.name || '--'}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{record.address || '--'}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{record.phoneNumber || '--'}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {momentToStringDate(record.createdDate) || '--'}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Card>
    );
};

const AvatarStyled = styled(Avatar)`
    & .ant-image,
    img.ant-image-img {
        width: 100%;
        height: 100%;
    }
`;

export default React.memo(Description);
