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
import { Col, Row } from 'antd';
import { TitleCard } from '@/config/global.style';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { data, isLoading, refetch, isRefetching } = useQuery<any>(['detailProduct', id], () =>
        ProductService.detail(id)
    );
    const product = data?.data;

    return (
        <>
            <TopBar back title={product?.name || '-'} />
            <Container>
                <CardComponent>
                    <CardContainer
                        leftCol={
                            <>
                                <CardRow left="Mã sản phẩm" right={product?.code} />
                                <CardRow left="Tên sản phẩm" right={product?.name} />
                                <CardRow left="Giá bán (VNĐ)" right={currencyFormat(product?.price) + 'đ'} />
                                <CardRow left="Loại hàng" right={product?.customType} />
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
                    <TitleCard>Thông tin hình ảnh & Video</TitleCard>
                    <Row gutter={[0, 20]} className="gx-mx-2 gx-mt-4">
                        <Col span={5}>Hình ảnh</Col>
                        <Col span={19}></Col>
                        <Col span={5}>Video</Col>
                        <Col span={19}></Col>
                    </Row>
                </CardComponent>
            </Container>
        </>
    );
};

export default ProductDetailPage;
