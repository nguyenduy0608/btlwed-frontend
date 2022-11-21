import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import SelectComponent from '@/components/SelectComponent';
import { DefaultSelectStyled } from '@/config/global.style';
import { Space } from 'antd';
import { IStatus, NEWS_STATUS, NEWS_TYPE } from '../service';

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    const handleChangeStatus = (value: any) => {
        returnFilter({ statusActive: value });
    };

    const handleChangeStatusNew = (value: any) => {
        returnFilter({ status: value });
    };

    const handleChangeTypeNew = (value: any) => {
        returnFilter({ typeNews: value });
    };

    return (
        <Space size="middle" wrap>
            <SearchInput onChangeSearch={(search) => returnFilter({ search })} placeholderSearch="Nhập tiêu đề" />

            <DefaultSelectStyled
                placeholder="Trạng thái hoạt động"
                allowClear
                style={{ width: '250px' }}
                defaultValue={null}
                onChange={handleChangeStatus}
            >
                <DefaultSelectStyled.Option value={IStatus.ACTIVE}>Đang hoạt động</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={IStatus.UNACTIVE}>Ngừng hoạt động</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Trạng thái"
                allowClear
                style={{ width: '250px' }}
                defaultValue={null}
                onChange={handleChangeStatusNew}
            >
                <DefaultSelectStyled.Option value={NEWS_STATUS.POST}>Đăng bài</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={NEWS_STATUS.DRAFT}>Lưu nháp</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Loại tin tức"
                allowClear
                style={{ width: '250px' }}
                defaultValue={null}
                onChange={handleChangeTypeNew}
            >
                <DefaultSelectStyled.Option value={NEWS_TYPE.BANNER}>Banner</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={NEWS_TYPE.POLICY}>Chính sách</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={NEWS_TYPE.TUTORIAL}>Hướng dẫn</DefaultSelectStyled.Option>
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
