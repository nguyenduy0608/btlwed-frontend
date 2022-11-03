import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import { DefaultSelectStyled } from '@/config/global.style';
import { Space } from 'antd';

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    return (
        <Space size="middle" wrap>
            <SearchInput onChangeSearch={(search) => returnFilter({ search })} placeholderSearch="Nhập tiêu đề" />

            <SelectComponent
                onChange={(item: any) => {
                    returnFilter({ province_id: item?.key || '' });
                }}
                apiUrl="/address/provinces"
                placeholder="Nhóm sản phẩm"
            />

            <DefaultSelectStyled
                placeholder="Trạng thái hoạt động"
                allowClear
                style={{ width: '250px' }}
                defaultValue={null}
                // onChange={handleChange}
            >
                <DefaultSelectStyled.Option value={1}>Đang hoạt động</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={0}>Ngừng hoạt động</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Trạng thái"
                allowClear
                style={{ width: '250px' }}
                defaultValue={null}
                // onChange={handleChange}
            >
                <DefaultSelectStyled.Option value={1}>Đang hoạt động</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={0}>Ngừng hoạt động</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Loại tin tức"
                allowClear
                style={{ width: '250px' }}
                defaultValue={null}
                // onChange={handleChange}
            >
                <DefaultSelectStyled.Option value={1}>Đang hoạt động</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={0}>Ngừng hoạt động</DefaultSelectStyled.Option>
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
