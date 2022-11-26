import RangerPicker from '@/components/RangerPicker';
import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { Space } from 'antd';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { IStatus, NEWS_STATUS, NEWS_TYPE } from '../service';

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    const location = useLocation();

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
            <SearchInput
                defaultValue={location?.state?.search}
                onChangeSearch={(search) => returnFilter({ search })}
                placeholderSearch="Nhập tiêu đề"
            />

            <DefaultSelectStyled
                placeholder="Trạng thái hoạt động"
                allowClear
                style={{ width: '250px' }}
                defaultValue={location?.state?.statusActive}
                onChange={handleChangeStatus}
            >
                <DefaultSelectStyled.Option value={IStatus.ACTIVE}>Đang hoạt động</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={IStatus.UNACTIVE}>Ngừng hoạt động</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Trạng thái"
                allowClear
                style={{ width: '250px' }}
                defaultValue={location?.state?.status}
                onChange={handleChangeStatusNew}
            >
                <DefaultSelectStyled.Option value={NEWS_STATUS.POST}>Đăng bài</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={NEWS_STATUS.DRAFT}>Lưu nháp</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
            <DefaultSelectStyled
                placeholder="Loại tin tức"
                allowClear
                defaultValue={location?.state?.typeNews}
                style={{ width: '250px' }}
                onChange={handleChangeTypeNew}
            >
                <DefaultSelectStyled.Option value={NEWS_TYPE.BANNER}>Banner</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={NEWS_TYPE.POLICY}>Chính sách</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={NEWS_TYPE.TUTORIAL}>Hướng dẫn</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
            <RangerPicker
                defaultValue={
                    location?.state?.createFrom
                        ? [moment(location?.state?.createFrom), moment(location?.state?.createTo)]
                        : null
                }
                name="dateFilter"
                onChange={(name: string, value: string) => {
                    returnFilter({ createFrom: value.split(',')[0], createTo: value.split(',')[1] });
                }}
            />
        </Space>
    );
};

export default Filter;
