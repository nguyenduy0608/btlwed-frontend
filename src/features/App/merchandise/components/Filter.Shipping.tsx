import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import SelectTreeCategory from '@/components/SelectComponent/Select.Tree.Category';
import { DefaultSelectStyled } from '@/config/global.style';
import useCallContext from '@/hooks/useCallContext';
import { Space } from 'antd';
import React from 'react';

const FilterShipping = ({ returnFilter }: { returnFilter: any }) => {
    const { state } = useCallContext();

    return (
        <Space size="middle" wrap>
            <SearchInput onChangeSearch={(search) => returnFilter({ search })} placeholderSearch="Nhập mã trả hàng" />

            <DefaultSelectStyled
                allowClear
                onChange={(value: any) => returnFilter({ kiotviet_id: value || '' })}
                placeholder="Chọn nhà cung cấp"
            >
                {state?.kiotviets &&
                    state?.kiotviets.map((item: any) => (
                        <DefaultSelectStyled.Option key={item.id} value={item.id}>
                            {item.name}
                        </DefaultSelectStyled.Option>
                    ))}
            </DefaultSelectStyled>

            <SelectTreeCategory
                onChange={(categoryId: any) => {
                    returnFilter({ category_id: categoryId || '' });
                }}
                placeholder="Người tạo"
            />
            <RangerPicker
                name="dateFilter"
                onChange={(name: string, value: string) => {
                    returnFilter({ createFrom: value.split(',')[0], createTo: value.split(',')[1] });
                }}
            />
        </Space>
    );
};
export default FilterShipping;
