    import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import { DefaultSelectStyled } from '@/config/global.style';
import { Select, Space } from 'antd';

const { Option } = Select;

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    const handleChange = (value: any) => {
        returnFilter({ status: value });
    };

    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập mã, tên sản phẩm"
            />
            <SelectComponent
                onChange={(item: any) => {
                    returnFilter({ category_id: item?.key || '' });
                }}
                apiUrl="/admin/product_category"
                placeholder="Chọn danh mục"
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
        </Space>
    );
};

export default Filter;
