import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import { Select, Space } from 'antd';

const { Option } = Select;

const Filter = ({
    returnFilter,
    returnFilterProvince,
}: {
    returnFilter: (filter: any) => void;
    returnFilterProvince: any;
}) => {
    const handleChange = (value: any) => {
        returnFilter({ status: value });
    };

    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập tên, số điện thoại"
            />
            {/* <SelectComponent
                onChange={(item: any) => {
                    returnFilter({ province_id: item?.key || '' });
                }}
                apiUrl="/address/provinces"
                placeholder="Chọn Tỉnh/ Thành phố"
            /> */}
            <SearchInput
                onChangeSearch={(search) => returnFilterProvince({ address: search })}
                placeholderSearch="Nhập tỉnh thành phố"
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

export default Filter;
