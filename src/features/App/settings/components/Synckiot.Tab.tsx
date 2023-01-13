import IconAntd from '@/components/IconAntd';
import TableComponent, { TableStyled } from '@/components/TableComponent';
import { SET_CALLBACK_KIOVIET } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import { Notification } from '@/utils';
import { Button, Popconfirm, Switch } from 'antd';
import React from 'react';
import { settingService } from '../service';
import DetailKiotViet from './KiotViet';
import { columns } from './Setting.Config';

const SynckiotTab = () => {
    const { state, dispatch } = useCallContext();
    const [keysExpanded, setKeysExpanded] = React.useState<string[]>([]);

    const rowRender = (record: any, index: number, indent: number, expanded: any) => {
        const row = document.querySelector(`[data-row-key="${record.id}"]`);
        if (expanded) {
            row?.classList.add('rowTableSelect');
        } else {
            row?.classList.remove('rowTableSelect');
        }

        // return <Description record={record} refetch={refetch} />;
        return <DetailKiotViet record={record} />;
    };

    return (
        <>
            <TableStyled
                showSorterTooltip={{ title: 'Sắp xếp' }}
                id="table_antd"
                className="gx-table-responsive"
                expandable={{
                    expandedRowRender: rowRender,
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
                dataSource={state?.kiotviets || []}
                columns={[
                    ...columns(1),
                    {
                        title: 'Đồng bộ',
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
                                    onChange={(value) => {
                                        settingService.toggleActive(row?.id).then((res) => {
                                            if (res.data?.status) {
                                                Notification(
                                                    'success',
                                                    `Gian hàng ${row.name} đang thực hiện quá trình đồng bộ`
                                                );
                                            } else {
                                                Notification(
                                                    'success',
                                                    `Gian hàng ${row.name} đã tạm ngưng quá trình đồng bộ`
                                                );
                                            }
                                            dispatch({
                                                type: SET_CALLBACK_KIOVIET,
                                            });
                                        });
                                    }}
                                    checked={!!value}
                                />
                            </div>
                        ),
                    },
                    {
                        title: '',
                        dataIndex: 'action',
                        align: 'center',
                        render: (value: any, row: any) => (
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <Popconfirm
                                    onConfirm={() => {
                                        settingService.deleteKiotviet(row.id).then(() => {
                                            dispatch({
                                                type: SET_CALLBACK_KIOVIET,
                                            });
                                            Notification('success', 'Xoá gian hàng thành công');
                                        });
                                    }}
                                    title="Bạn có chắc chắn muốn xoá?"
                                >
                                    <Button icon={<IconAntd icon="DeleteOutlined" />} />
                                </Popconfirm>
                            </div>
                        ),
                    },
                ]}
            />
        </>
    );
};

export default SynckiotTab;
