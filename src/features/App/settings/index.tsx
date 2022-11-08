import CardComponent from '@/components/CardComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Tabs } from 'antd';
import React from 'react';
import InformationTab from './components/Information.Tab';
import SynckiotTab from './components/Synckiot.Tab';
const items = [
    { label: 'Thông tin hệ thống', key: '0', children: <InformationTab /> }, // remember to pass the key prop
    { label: 'Đồng bộ Kiot Việt', key: '1', children: <SynckiotTab /> },
];
const SettingPage = () => {
    const [tabIndex, setTabIndex] = React.useState('0');
    console.log('🚀 ~ file: index.tsx ~ line 14 ~ SettingPage ~ tabIndex', tabIndex);

    return (
        <>
            <TopBar title="Cấu hình" />
            <Container>
                <CardComponent>
                    <Tabs
                        onChange={(key) => setTabIndex(key)}
                        tabBarExtraContent={
                            tabIndex === '1' && (
                                <Button className="gx-mb-2" type="primary">
                                    Thêm mới
                                </Button>
                            )
                        }
                        type="card"
                        items={items}
                    />
                </CardComponent>
            </Container>
        </>
    );
};

export default SettingPage;
