import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { ADMIN } from '@/contants';
import { DatePicker, Select, Space } from 'antd';
import React from 'react';
import { IFilter } from '../../voucher/type';

const { Option } = Select;

const Filter = ({ returnFilter }: any) => {
    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => {
                    returnFilter({ search });
                }}
                placeholderSearch="Nhập tên hoặc số điện thoại"
            />
        </Space>
    );
};

export default Filter;
