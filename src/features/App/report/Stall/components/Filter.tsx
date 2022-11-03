import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import { Space } from 'antd';
import React from 'react';

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    return (
        <Space size="middle" wrap>
            <SearchInput onChangeSearch={(search) => returnFilter({ search })} placeholderSearch="Tên gian hàng" />

            <RangerPicker
                name="dateFilter"
                onChange={(name: string, value: string) => {
                    returnFilter({ createFrom: value.split(',')[0], createTo: value.split(',')[1] });
                }}
            />
        </Space>
    );
};

export default Filter;
