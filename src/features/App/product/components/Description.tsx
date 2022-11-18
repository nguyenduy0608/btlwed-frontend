import { TableStyled } from '@/components/TableComponent';
import { TitleCardDes } from '@/config/global.style';
import { momentToStringDate } from '@/utils';
import { Card, Input, message, Switch } from 'antd';
import React from 'react';
import { CategoryService } from '../service';
import Buttons from './Buttons';
import { columns, DataTypeProductCategory } from './Product.Config';
interface IProps {
    record: DataTypeProductCategory;
    handleShowModal?: (record: DataTypeProductCategory) => void;
    refetch: any;
}
const Description: React.FC<IProps> = ({ record, handleShowModal, refetch }) => {
    const [keysExpanded, setKeysExpanded] = React.useState<string[]>([]);

    return (
        <Card className="gx-mb-0">
            {/* <Descriptions title="Thông tin danh mục" column={2}>
                <Descriptions.Item label="Tên danh mục">{record.name || '--'}</Descriptions.Item>
                <Descriptions.Item label="Thứ tự hiển thị">{record.order || '--'}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                    {record.status ? (
                        <TagResult  text="Đang hoạt động" color="processing" />
                    ) : (
                        <TagResult text="Ngừng hoạt động" color="error" />
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">{momentToStringDate(record.createdAt) || '--'}</Descriptions.Item>
            </Descriptions> */}
            <TitleCardDes>Danh mục con</TitleCardDes>
            <TableStyled
                showSorterTooltip={{ title: 'Sắp xếp' }}
                id="table_antd"
                className="gx-table-responsive gx-mt-3"
                expandable={{
                    expandedRowKeys: keysExpanded,
                    expandRowByClick: true,
                    onExpandedRowsChange: (keys: any) => {
                        if (keys?.length > 0) {
                            setKeysExpanded([keys.reverse()[0]]);
                        } else {
                            setKeysExpanded([]);
                        }
                    },
                }}
                bordered
                pagination={false}
                rowKey={(record: any) => record.id}
                dataSource={record?.listChild || []}
                columns={[
                    ...columns(1),
                    // {
                    //     title: 'Thứ tự hiển thị',
                    //     dataIndex: 'order',
                    //     align: 'center',
                    //     width: 200,
                    //     render: (value: any, row: any) => (
                    //         <div
                    //             onClick={(e: any) => {
                    //                 e.preventDefault();
                    //                 e.stopPropagation();
                    //             }}
                    //         >
                    //             <Input
                    //                 onBlur={(e) =>
                    //                     CategoryService.update(row.id, { order: e.target.value }).then(() => {
                    //                         message.success('Thay đổi thứ tự thành công');

                    //                         refetch();
                    //                     })
                    //                 }
                    //                 defaultValue={value}
                    //             />
                    //         </div>
                    //     ),
                    // },
                    {
                        title: 'Ngày tạo',
                        dataIndex: 'createdAt',
                        align: 'center',
                        width: 200,
                        render: (value: any) => momentToStringDate(value),
                    },
                    {
                        title: 'Trạng thái',
                        dataIndex: 'status',
                        align: 'center',
                        width: 40,
                        render: (value: number, row: any) => (
                            <div
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <Switch
                                    onChange={(value) => {
                                        CategoryService.changeStatus(row.id, value).then(() => {
                                            message.success('Cập nhật trạng thái thành công');
                                            refetch();
                                        });
                                    }}
                                    defaultChecked={!!value}
                                />
                            </div>
                        ),
                    },
                ]}
            />
        </Card>
    );
};

export default React.memo(Description);
