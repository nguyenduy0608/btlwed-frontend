import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { IStatus } from '@/types';
import { DatePicker, Select, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import { IFilter } from '../type';

const { Option } = Select;

const Filter = ({ returnFilter }: { returnFilter: (filter: IFilter) => void }) => {
    const handleChange = (value: any) => {
        returnFilter({ status: value });
    };

    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập mã, tên phòng ban"
            />
        </Space>
    );
};

export default Filter;
