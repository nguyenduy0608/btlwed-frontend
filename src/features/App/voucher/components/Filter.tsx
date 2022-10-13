import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { DatePicker, Select, Space } from 'antd';
import moment from 'moment';
import React from 'react';
const { RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;
const Filter = () => {
    const handleChange = (value: any) => {
        console.log(`selected ${value}`);
    };

    return (
        <Space size="middle" wrap>
            <SearchInput onChangeSearch={(search) => console.log(search)} placeholderSearch="Nhập mã, tên voucher" />
            <DefaultSelectStyled
                placeholder="Trạng thái"
                allowClear
                style={{ width: '200px' }}
                defaultValue="lucy"
                onChange={handleChange}
            >
                <Option value="đang hoạt động">Đang hoạt động</Option>
                <Option value="ngừng hoạt động">Ngừng hoạt động</Option>
                <Option value="disabled" disabled>
                    Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
            </DefaultSelectStyled>
            <RangePicker
                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                format={dateFormat}
            />
        </Space>
    );
};

export default Filter;
