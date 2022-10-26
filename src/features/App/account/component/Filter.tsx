import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { DatePicker, Select, Space } from 'antd';
import React from 'react';
import { IFilter } from '../../voucher/type';

const { Option } = Select;

const Filter = ({ returnFilter }: { returnFilter: (filter: IFilter) => void }) => {
    const handleChange = (value: any) => {
        returnFilter({ status: value });
    };
    const handleChangeAdmin = (value: any) => {
        returnFilter({ accountId: value });
    };

    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập tên hoặc số điện thoại"
            />
            <DefaultSelectStyled
                placeholder="Trạng thái"
                allowClear
                style={{ width: '200px' }}
                defaultValue={null}
                onChange={handleChange}
            >
                <Option value={1}>Đang hoạt động</Option>
                <Option value={0}>Ngừng hoạt động</Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Loại tài khoản"
                allowClear
                style={{ width: '200px' }}
                defaultValue={null}
                onChange={handleChangeAdmin}
            >
                <Option value={1}>Admin</Option>
                <Option value={2}>Admin gian hàng</Option>
            </DefaultSelectStyled>
        </Space>
    );
};

export default Filter;
