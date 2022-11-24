import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import SelectTreeCategory from '@/components/SelectComponent/Select.Tree.Category';
import { Space } from 'antd';
import React from 'react';

const FilterImportCommodity = ({ returnFilter }: { returnFilter: any }) => {
    return (
        <Space size="middle" wrap>
            <SearchInput onChangeSearch={(search) => returnFilter({ search })} placeholderSearch="Nhập mã nhập hàng " />

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
export default FilterImportCommodity;
