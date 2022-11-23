import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import SelectTreeCategory from '@/components/SelectComponent/Select.Tree.Category';
import { DefaultSelectStyled } from '@/config/global.style';
import useCallContext from '@/hooks/useCallContext';
import { Space } from 'antd';
import React from 'react';

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    const { state, dispatch } = useCallContext();

    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập tên, mã sản phẩm"
            />

            {/* <SelectComponent
                onChange={(item: any) => {
                    returnFilter({ province_id: item?.key || '' });
                }}
                apiUrl="/address/provinces"
                placeholder="Nhóm sản phẩm"
            /> */}

            <SelectTreeCategory
                onChange={(categoryId: any) => {
                    returnFilter({ category_id: categoryId || '' });
                }}
                placeholder="Nhóm sản phẩm"
            />
            {/* <SelectComponent
                onChange={(item: any) => {
                    returnFilter({ province_id: item?.key || '' });
                }}
                apiUrl="/address/provinces"
                placeholder="Gian hàng"
            /> */}

            <DefaultSelectStyled
                allowClear
                onChange={(value: any) => returnFilter({ kiotviet_id: value || '' })}
                placeholder="Chọn gian hàng"
            >
                {state?.kiotviets &&
                    state?.kiotviets.map((item: any) => (
                        <DefaultSelectStyled.Option key={item.id} value={item.id}>
                            {item.name}
                        </DefaultSelectStyled.Option>
                    ))}
            </DefaultSelectStyled>

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
