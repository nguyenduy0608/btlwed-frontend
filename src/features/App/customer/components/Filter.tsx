import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import { Select, Space } from 'antd';

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập tên, số điện thoại"
            />
        </Space>
    );
};

export default Filter;
