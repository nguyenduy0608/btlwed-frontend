import CardComponent from '@/components/CardComponent';
import CardContainer from '@/components/CardComponent/Card.Container';
import CardRow from '@/components/CardComponent/Card.Row';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ProductService } from '../service';
import { currencyFormat } from '@/utils';
import TagResult from '@/components/TagResult';
import { Col, Image, Row, Typography } from 'antd';
import { DefaultSelectStyled, TitleCard } from '@/config/global.style';
import styled from 'styled-components';
import EditButton from '@/components/Button/Edit.Button';
import SaveButton from '@/components/Button/Save.Button';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [isEdit, setIsEdit] = React.useState(false);

    const { data, isLoading, refetch, isRefetching } = useQuery<any>(['detailProduct', id], () =>
        ProductService.detail(id)
    );
    const product = data?.data;

    return (
        <>
            <TopBar
                back
                title={product?.name || '-'}
                extra={
                    isEdit ? (
                        <SaveButton onClick={() => setIsEdit(false)} />
                    ) : (
                        <EditButton onClick={() => setIsEdit(true)} />
                    )
                }
            />
            <Container>
                <CardComponent>
                    <CardContainer
                        leftCol={
                            <>
                                <CardRow left="Mã sản phẩm" right={product?.code} />
                                <CardRow left="Tên sản phẩm" right={product?.name} />
                                <CardRow left="Giá bán (VNĐ)" right={currencyFormat(product?.price) + 'đ'} />
                                <CardRow
                                    left="Loại hàng"
                                    right={
                                        isEdit ? (
                                            <DefaultSelectStyled
                                                defaultValue={product?.customType}
                                                placeholder="Chọn loại hàng"
                                            >
                                                <DefaultSelectStyled.Option value="is_new">
                                                    Hàng mới
                                                </DefaultSelectStyled.Option>
                                                <DefaultSelectStyled.Option value="is_sale">
                                                    Hàng bán chạy
                                                </DefaultSelectStyled.Option>
                                            </DefaultSelectStyled>
                                        ) : (
                                            product?.customType
                                        )
                                    }
                                />
                                <CardRow left="Tổng tồn" right={product?.stock || 0} />
                                {/* <CardRow left="Số khách quan tâm" right={'Chưa có api'} /> */}
                            </>
                        }
                        rightCol={
                            <>
                                <CardRow left="Danh mục" right={product?.categoryTree?.name} />
                                <CardRow
                                    left="Trạng thái"
                                    right={
                                        product?.status ? (
                                            <TagResult text="Đang hoạt động" color="processing" />
                                        ) : (
                                            <TagResult text="Dừng hoạt động" color="error" />
                                        )
                                    }
                                />
                                {/* <CardRow left="Thuộc tính" right={'Chưa có api'} /> */}
                                <CardRow left="Đơn vị tính (Mặc định)" right={product?.masterUnit} />
                                <CardRow left="Đơn vị tính (Quy đổi)" right={product?.unit} />
                                <CardRow left="Mô tả" right={product?.description} />
                            </>
                        }
                        title="Thông tin sản phẩm"
                    />
                </CardComponent>
                <CardComponent>
                    <TitleCard>Thông tin hình ảnh</TitleCard>
                    <Row gutter={[0, 20]} className="gx-mx-2 gx-mt-4">
                        <Col span={5}>Hình ảnh</Col>
                        <Col span={19}>
                            <Row>
                                {product?.images?.map((item: any) => (
                                    <ColImageStyled span={2}>
                                        <Image wrapperStyle={{ height: '100%' }} src={item?.src} />
                                    </ColImageStyled>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </CardComponent>
            </Container>
        </>
    );
};

const ColImageStyled = styled(Col)`
    border: 1px dashed #ccc;
    margin: 0 6px !important;
    padding: 4px;
    border-radius: 10px;
    & .ant-image-mask {
        border-radius: 10px;
    }
`;

export default ProductDetailPage;
