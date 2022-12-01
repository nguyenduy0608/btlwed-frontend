import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import SelectTreeCategory from '@/components/SelectComponent/Select.Tree.Category';
import { DefaultSelectStyled } from '@/config/global.style';
import { Select, Space } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

const { Option } = Select;

const Filter = ({ returnFilter, params }: { returnFilter: (filter: any) => void; params: any }) => {
    const location = useLocation();

    const handleChange = (value: any) => {
        returnFilter({ status: value });
    };

    return (
        <Space size="middle" wrap>
            <SearchInput
                defaultValue={location.state?.search}
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập mã, tên sản phẩm"
            />
            {/* <SelectComponent
                value={params?.category_id ? { value: params?.category_id } : undefined}
                onChange={(item: any) => {
                    returnFilter({ category_id: item?.key || '' });
                }}
                apiUrl="/admin/product_category"
                placeholder="Chọn danh mục"
            /> */}
            <SelectTreeCategory
                onChange={(categoryId: any) => {
                    returnFilter({ category_id: categoryId || '' });
                }}
                params={{ kiotvietId: params.kiotvietId }}
                placeholder="Chọn danh mục"
            />
            <DefaultSelectStyled
                placeholder="Trạng thái"
                allowClear
                style={{ width: '200px' }}
                defaultValue={location?.state?.status === 0 ? 0 : location?.state?.status || undefined}
                onChange={handleChange}
            >
                <Option value={1}>Đang hoạt động</Option>
                <Option value={0}>Ngừng hoạt động</Option>
            </DefaultSelectStyled>
        </Space>
    );
};

export default React.memo(Filter);
