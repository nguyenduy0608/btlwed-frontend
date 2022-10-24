import { Col, Form } from 'antd';
import React, { ReactNode } from 'react';

const FormItemComponent = ({
    grid,
    label,
    name,
    rules,
    valuePropName,
    inputField,
}: {
    grid?: boolean;
    label: string;
    name?: string;
    rules?: any;
    valuePropName?: any;
    inputField: ReactNode;
}) => {
    return (
        <Col span={grid ? 12 : 24}>
            <Form.Item
                // style={{ marginBottom: '14px' }}
                colon={false}
                label={label}
                name={name}
                rules={rules}
                valuePropName={valuePropName}
            >
                {inputField}
            </Form.Item>
        </Col>
    );
};

export default React.memo(FormItemComponent);
