import React from 'react';
import { Avatar, Card, Col, Descriptions, Image, Row } from 'antd';
import Buttons from './Buttons';
import { DataTypeAccount } from './Account.Config';
import { momentToStringDate } from '@/utils';
import styled from 'styled-components';
import { BOX_SHADOW } from '@/config/theme';
interface IProps {
    record: DataTypeAccount;
    refetch: any;
    handleShowModal?: (record: DataTypeAccount) => void;
}
const Description: React.FC<IProps> = ({ record, refetch, handleShowModal }) => {
    return (
        <Card className="gx-mb-0" actions={Buttons({ record, handleShowModal, refetch })}>
            <Row>
                <Col span={18}>
                    <Descriptions title="Thông tin tài khoản" column={2}>
                        <Descriptions.Item label="Tên người dùng">{record.fullName || '--'}</Descriptions.Item>
                        <Descriptions.Item label="Email">{record.email || '--'}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{record.phoneNumber || '--'}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {momentToStringDate(record.createdAt) || '--'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Vai trò">
                            {record.kiotvietId ? <p>Admin gian hàng</p> : <p>Admin</p>}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={6}>
                    <AvatarStyled shape="circle" size={140} icon={<Image preview={false} src={record.avatar} />} />
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
