import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import PaginationComponent from '../PaginationComponent';
type RowSelect = 'checkbox' | 'radio';

interface IProps {
    dataSource: any[];
    columns: ColumnsType<any>;
    page: number;
    onChangePage: (page: number) => void;
    total?: number;
    isPagination?: boolean;
    rowSelect?: boolean;
    loading?: boolean;
    isPageSettings?: boolean;
    id?: string;
    expandedRowRender?: (record: any, index: number, indent: number, expanded: any) => ReactNode;

    onRowSelection: (row: any[]) => void;
    typeRowSelect?: RowSelect;
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
}) => {
    const [keysExpanded, setKeysExpanded] = React.useState<string[]>([]);

    const rowSelection = {
        onChange: (rowKey: React.Key[], selectedRows: any[]) => {
            onRowSelection(selectedRows);
        },
    };

    return (
        <Row className="gx-m-0">
            <Col span={24} className="gx-m-0 gx-px-0">
                <WrapperTable>
                    <TableStyled
                        id={id}
                        className="gx-table-responsive"
                        rowSelection={
                            rowSelect
                                ? {
                                      type: typeRowSelect,
                                      ...rowSelection,
                                  }
                                : {}
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
                        bordered
                        pagination={false}
                        rowKey={(record: any) => record.id}
                        // scroll={{ x: '100vh', y: `calc(100vh - ${pathname === '/settings' ? '330px' : '270px'})` }}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </WrapperTable>
            </Col>
            {isPagination && (
                <Col span={24}>
                    <Row justify="end">
                        <PaginationComponent page={page || 1} total={total || 0} onChange={onChangePage} />
                    </Row>
                </Col>
            )}
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
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.005);
    }

    & .ant-table-body::-webkit-scrollbar {
        height: 10px;
        width: 4px;
    }

    & .ant-table-body::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #999;
    }
`;

export default TableComponent;
