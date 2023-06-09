import ActiveButton from '@/components/Button/Active.Button';
import SaveButton from '@/components/Button/Save.Button';
import UnActiveButton from '@/components/Button/UnActive.Button';
import FormComponent from '@/components/FormComponent';
import IconAntd from '@/components/IconAntd';
import ModalComponent from '@/components/ModalComponent';
import { Notification } from '@/utils';
import { Button, Card, Col, Form, Input, Row, Space, Tabs } from 'antd';
import React from 'react';
import { rules } from '../../voucher/rules';
import { CustomerService } from '../service';
import { DataTypeEmployee } from './Employee.Config';

interface IProps {
    record: DataTypeEmployee;
    refetch: any;
}
const Description: React.FC<IProps> = ({ record, refetch }) => {
    const [form] = Form.useForm();

    const [tabActive, setTabActive] = React.useState('1');
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleLock = async (id: number) => {
        const res = await CustomerService.changeStatus(id, 0);
        if (res.status) {
            refetch();
        }
    };

    const handleUnlock = async (id: number) => {
        const res = await CustomerService.changeStatus(id, 1);
        if (res.status) {
            refetch();
        }
    };

    return (
        <>
            {/* <Card
                className="gx-mb-0"
                actions={
                    tabActive === '1'
                        ? [
                              record.status ? (
                                  <UnActiveButton onClick={() => handleLock(record.id)} />
                              ) : (
                                  <ActiveButton onClick={() => handleUnlock(record.id)} />
                              ),
                              <Button
                                  disabled={record.status === 0}
                                  type="text"
                                  className="gx-mb-0"
                                  style={{
                                      fontSize: '16px',
                                      color: 'green',
                                  }}
                                  onClick={() => setModalVisible(true)}
                              >
                                  <IconAntd icon="EditOutlined" />
                                  Đổi mật khẩu
                              </Button>,
                          ]
                        : []
                }
            >
                <Tabs onChange={setTabActive} items={[]} />
            </Card>
            <ModalComponent title="Đổi mật khẩu" modalVisible={modalVisible}>
                <FormComponent form={form} onSubmit={handleSubmit}>
                    <Row gutter={[20, 0]}>
                        <Col span={24}>
                            <Form.Item
                                rules={[rules.required('Vui lòng nhập mật khẩu!')]}
                                name="password"
                                label="Mật khẩu"
                                hasFeedback
                            >
                                <Input.Password placeholder="Nhập mật khẩu" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                rules={[
                                    rules.required('Vui lòng nhập lại mật khẩu!'),
                                    ({ getFieldValue }: any) => ({
                                        validator(_: any, value: any) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập lại không trùng khớp!'));
                                        },
                                    }),
                                ]}
                                dependencies={['password']}
                                hasFeedback
                                name="rePassword"
                                label="Nhập lại mật khẩu"
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }} justify="end">
                        <Space>
                            <Button type="default" onClick={() => setModalVisible(false)}>
                                Thoát
                            </Button>
                            <SaveButton htmlType="submit" />
                        </Space>
                    </Row>
                </FormComponent>
            </ModalComponent> */}
        </>
    );
};

export default React.memo(Description);
