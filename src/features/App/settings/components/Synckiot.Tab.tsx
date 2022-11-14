import TableComponent, { TableStyled } from '@/components/TableComponent';
import useCallContext from '@/hooks/useCallContext';
import React from 'react';
import DetailKiotViet from './KiotViet';
import { columns } from './Setting.Config';

const SynckiotTab = () => {
    const { state } = useCallContext();
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
                columns={columns(1)}
            />
        </>
    );
};

export default SynckiotTab;
