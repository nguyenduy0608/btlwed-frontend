import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { WALLET_TYPE } from '@/contants';
import { Select, Space } from 'antd';

const { Option } = Select;

const FilterWallet = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    const handleChange = (value: any) => {
        returnFilter({ type: value });
    };

    return (
        <Space size="middle" wrap>
            <DefaultSelectStyled
                placeholder={<strong>Chọn tác vụ</strong>}
                allowClear
                style={{ width: '200px' }}
                defaultValue={null}
                onChange={handleChange}
            >
                <Option value={WALLET_TYPE.ORDER_COMPLETED}>Hoàn thành đơn hàng</Option>
                <Option value={WALLET_TYPE.PAYMENT_ORDER}>Thanh toán đơn hàng</Option>
                {/* <Option value={WALLET_TYPE.INVITE}>Giới thiệu ứng dụng</Option>
                <Option value={WALLET_TYPE.JOIN_WITH_INVITE}>Đăng ký với mã giới thiệu</Option>
                <Option value={WALLET_TYPE.DEPOSIT}>Nạp tiền từ VNPAY</Option>
                <Option value={WALLET_TYPE.GIFT_EXCHANGE}>Đổi quà</Option> */}
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

export default FilterWallet;
