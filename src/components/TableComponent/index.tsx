import { RADIUS } from '@/config/theme';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import PaginationComponent from '../PaginationComponent';
type RowSelect = 'checkbox' | 'radio';

interface IProps {
    dataSource: any[];
    columns: ColumnsType<any>;
    page?: number;
    onChangePage?: (page: number) => void;
    total?: number;
    isPagination?: boolean;
    rowSelect?: boolean;
    loading?: boolean;
    isPageSettings?: boolean;
    id?: string;
    expandedRowRender?: (record: any, index: number, indent: number, expanded: any) => ReactNode;

    onRowSelection?: (row: any[]) => void;
    typeRowSelect?: RowSelect;
    header?: any;
    onRowClick?: any;
    customRowKey?: any;
    renderDefault?: any;
    rowClassName?: any;
    hiddenSelectAll?: boolean;
}

const TableComponent: React.FC<IProps> = ({
    id = 'table_antd',
    dataSource,
    columns,
    page,
    onChangePage,
    isPagination = true,
    rowSelect = true,
    total,
    onRowSelection,
    expandedRowRender,
    loading = false,
    typeRowSelect = 'checkbox',
    header,
    onRowClick,
    customRowKey,
    renderDefault,
    rowClassName,
    hiddenSelectAll,
}) => {
    const [keysExpanded, setKeysExpanded] = React.useState<string[]>([]);

    const rowSelection = {
        onChange: (rowKey: React.Key[], selectedRows: any[]) => {
            onRowSelection && onRowSelection(selectedRows);
        },
        hideSelectAll: hiddenSelectAll,
    };

    return (
        <Row className="gx-m-0">
            <Col span={24} className="gx-m-0 gx-px-0">
                <WrapperTable>
                    <TableStyled
                        showSorterTooltip={{ title: 'Sắp xếp' }}
                        loading={loading}
                        title={header ? () => header : undefined}
                        id={id}
                        className="gx-table-responsive"
                        // @ts-ignore
                        rowSelection={
                            rowSelect
                                ? customRowKey
                                    ? {
                                          selectedRowKeys: customRowKey,
                                          type: typeRowSelect,
                                          ...rowSelection,
                                      }
                                    : {
                                          type: typeRowSelect,
                                          ...rowSelection,
                                      }
                                : false
                        }
                        expandable={{
                            expandedRowRender,
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
                        onRow={(record) => {
                            return {
                                onClick: () => onRowClick && onRowClick(record), // click row
                            };
                        }}
                        rowClassName={rowClassName || undefined}
                        bordered
                        pagination={false}
                        rowKey={(record: any) => record.id}
                        // scroll={{ x: '100vh', y: `calc(100vh - ${pathname === '/settings' ? '330px' : '270px'})` }}
                        dataSource={dataSource}
                        columns={columns}
                        // onChange={(all) => console.log('change table', all)}
                    />
                </WrapperTable>
            </Col>
            {!renderDefault && onChangePage && isPagination && total && total > 12 ? (
                <Col span={24}>
                    <Row justify="end" style={{ flexDirection: 'row' }}>
                        <PaginationComponent page={page || 1} total={total || 0} onChange={onChangePage} />
                    </Row>
                </Col>
            ) : null}
        </Row>
    );
};

const WrapperTable = styled.div`
    overflow-y: hidden;

    &::-webkit-scrollbar {
        width: 0;
    }
    padding-bottom: 10px;
`;

const TableStyled = styled(Table)`
    background-color: #fff;

    & th.ant-table-cell {
        font-weight: 700;
    }

    & th.ant-table-cell {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    & td.ant-table-cell {
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word !important;
    }

    & .ant-table-expanded-row td.ant-table-cell {
        padding: 10px;
    }

    & .ant-table-body {
        overflow: overlay;
    }

    & .ant-table-body::-webkit-scrollbar-track {
        border-radius: ${RADIUS};
        /* background-color: rgba(0, 0, 0, 0.005); */
    }

    & .ant-table-body::-webkit-scrollbar {
        height: 10px;
        width: 4px;
    }

    & .ant-table-body::-webkit-scrollbar-thumb {
        border-radius: ${RADIUS};
        background-color: #999;
    }
`;

export default TableComponent;
