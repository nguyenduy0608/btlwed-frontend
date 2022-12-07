import CardComponent from '@/components/CardComponent';
import CardContainer from '@/components/CardComponent/Card.Container';
import CardRow from '@/components/CardComponent/Card.Row';
import TopBar from '@/components/TopBar';
import TreeView from '@/components/TreeView';
import { DefaultSelectStyled, TitleCard } from '@/config/global.style';
import Container from '@/layout/Container';
import { currencyFormat } from '@/utils';
import { Col, Image, message, Row } from 'antd';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IStatus } from '../../news/service';
import { ProductService } from '../service';

const ProductDetailPage = () => {
    const { id } = useParams();

    const { data, isLoading, refetch } = useQuery<any>(['detailProduct', id], () => ProductService.detail(id));
    const product = data?.data;

    return (
        <>
            <TopBar
                back
                title={product?.name || '-'}
                // extra={
                //     isEdit ? (
                //         <SaveButton key="save" onClick={handleSubmit} />
                //     ) : (
                //         <EditButton key="edit" onClick={() => setIsEdit(true)} />
                //     )
                // }
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
                                        // isEdit ? (
                                        <DefaultSelectStyled
                                            value={product?.customType}
                                            allowClear
                                            placeholder="Chọn loại hàng"
                                            onChange={(value: any) => {
                                                ProductService.update(id as any, {
                                                    status: product?.status,
                                                    customType: value,
                                                }).then(() => {
                                                    refetch();
                                                    message.success('Cập nhật loại hàng thành công');
                                                });
                                            }}
                                        >
                                            <DefaultSelectStyled.Option value="">Không chọn</DefaultSelectStyled.Option>
                                            <DefaultSelectStyled.Option value="is_best_selling">
                                                Bán chạy
                                            </DefaultSelectStyled.Option>
                                            <DefaultSelectStyled.Option value="is_sale_off">
                                                Đang giảm giá
                                            </DefaultSelectStyled.Option>
                                        </DefaultSelectStyled>
                                    }
                                />
                                <CardRow left="Tổng tồn" right={product?.stock || 0} />
                                {/* <CardRow left="Số khách quan tâm" right={'Chưa có api'} /> */}
                            </>
                        }
                        rightCol={
                            <>
                                <CardRow
                                    left="Danh mục"
                                    right={
                                        product?.categoryTree?.parent ? (
                                            <TreeView
                                                parent={product?.categoryTree?.parent?.name}
                                                children={product?.categoryTree?.name}
                                            />
                                        ) : (
                                            product?.categoryTree?.name
                                        )
                                    }
                                />
                                <CardRow
                                    left="Trạng thái"
                                    right={
                                        // isEdit ? (
                                        <DefaultSelectStyled
                                            value={product?.status}
                                            placeholder="Trạng thái"
                                            onChange={(value: any) => {
                                                ProductService.update(id as any, {
                                                    status: value,
                                                    customType: product?.customType,
                                                }).then(() => {
                                                    refetch();
                                                    message.success('Cập nhật trạng thái thành công');
                                                });
                                            }}
                                        >
                                            <DefaultSelectStyled.Option value={IStatus.ACTIVE}>
                                                Đang hoạt động
                                            </DefaultSelectStyled.Option>
                                            <DefaultSelectStyled.Option value={IStatus.UNACTIVE}>
                                                Ngừng hoạt động
                                            </DefaultSelectStyled.Option>
                                        </DefaultSelectStyled>
                                    }
                                />
                                {/* <CardRow left="Thuộc tính" right={'Chưa có api'} /> */}
                                <CardRow left="Đơn vị tính (Mặc định)" right={product?.masterUnit} />
                                <CardRow left="Đơn vị tính (Quy đổi)" right={product?.unit} />
                            </>
                        }
                        oneRow={
                            <CardRow
                                full
                                left="Mô tả"
                                right={<div dangerouslySetInnerHTML={{ __html: product?.description }} />}
                            />
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
