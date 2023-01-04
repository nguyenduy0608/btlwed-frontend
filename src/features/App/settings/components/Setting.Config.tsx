import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { Switch } from 'antd';
import localeValues from 'antd/lib/locale/vi_VN';
import { settingService } from '../service';

export const columns = (page: number): any => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row: any, record: any, index: number) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên gian hàng',
        dataIndex: 'name',
    },
    {
        title: 'Client ID',
        dataIndex: 'clientId',
    },
    {
        title: 'Secret ID',
        dataIndex: 'clientSecret',
    },
];
export const WarehouseColumns = (page: number): any => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row: any, record: any, index: number) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên gian hàng',
        dataIndex: 'retailer',
    },
    {
        title: 'Kho tự động',
        dataIndex: 'name',
    },
    {
        title: 'Tỉnh/thành phố',
        dataIndex: 'province',
        render: (value: any) => {
            return (
                <div>
                    {value?.map((item: any, index: any) => {
                        const str = ', ';
                        let newArray: any = [];
                        if (index === value.length - 1) {
                            newArray.push(item);
                        } else {
                            newArray.push(item + str);
                        }
                        return newArray;
                    })}
                </div>
            );
        },
    },
];
