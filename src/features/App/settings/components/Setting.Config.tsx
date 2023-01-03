import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { Switch } from 'antd';
import localeValues from 'antd/lib/locale/vi_VN';

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
    {
        title: 'Trạng thái đồng bộ',
        dataIndex: 'status',
        align: 'center',
        render: (value: number, row: any) => (
            <div
                onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <Switch
                    // onChange={(value) => {
                    //     newService
                    //         .updateStatus(row.id, {
                    //             statusActive: value,
                    //             title: row.title,
                    //             status: row.status,
                    //             type: row.type,
                    //         })
                    //         .then(() => {
                    //             refetch();
                    //         });
                    // }}
                    defaultChecked={!!value}
                />
            </div>
        ),
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
                <td>
                    {value?.map((item: any, index: any) => {
                        const str = ',';
                        let newArray: any = [];
                        if (index === value.length - 1) {
                            newArray.push(item);
                        } else {
                            newArray.push(item + str);
                        }
                        return newArray;
                    })}
                </td>
            );
        },
    },
];
