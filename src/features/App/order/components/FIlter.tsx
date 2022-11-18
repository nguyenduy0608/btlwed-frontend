import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { Select, Space } from 'antd';
import { IFilter } from '../type';
const { Option } = Select;

const Filter = ({ returnFilter }: { returnFilter: (filter: IFilter) => void }) => {
    const handleChangeStatus = (value: any) => {
        returnFilter({ status: value });
    };
    const handleChange = (value: any) => {
        returnFilter({ createtableType: value });
    };

    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập mã đơn, Tên/SĐT khách hàng"
            />
            <DefaultSelectStyled
                placeholder="Trạng thái"
                allowClear
                style={{ width: '160px' }}
                defaultValue={null}
                onChange={handleChangeStatus}
            >
                <Option value={'inprogress'}>Đang xử lý</Option>
                <Option value={'wait_confirmation'}>Chờ xác nhận</Option>
                <Option value={'completed'}>Hoàn thành</Option>
                <Option value={'cacelled'}>Hủy</Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Nguồn đơn"
                allowClear
                style={{ width: '160px' }}
                defaultValue={null}
                onChange={handleChange}
            >
                <Option value={'user'}>Staka</Option>
                <Option value={'admin'}>KiotViet</Option>
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
