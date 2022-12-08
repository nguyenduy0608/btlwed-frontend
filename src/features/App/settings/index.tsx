import CardComponent from '@/components/CardComponent';
import IconAntd from '@/components/IconAntd';
import ModalComponent from '@/components/ModalComponent';
import TopBar from '@/components/TopBar';
import { SET_CALLBACK_KIOVIET } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { Button, Steps, Tabs } from 'antd';
import React from 'react';
import InformationTab from './components/Information.Tab';
import SynckiotForm from './components/Synckiot.Form';
import SynckiotTab from './components/Synckiot.Tab';
const items = [
    { label: 'Thông tin hệ thống', key: '0', children: <InformationTab /> }, // remember to pass the key prop
    { label: 'Đồng bộ Kiot Việt', key: '1', children: <SynckiotTab /> },
];
const SettingPage = () => {
    const { state, dispatch } = useCallContext();

    const [tabIndex, setTabIndex] = React.useState('0');
    const [addKiotViet, setAddKiotViet] = React.useState(false);

    // step
    const [current, setCurrent] = React.useState(0);

    const handleNextStep = () => {
        setCurrent((prev: number) => prev + 1);
    };
    const handleBackStep = React.useCallback(() => {
        setCurrent((prev: number) => prev - 1);
    }, []);

    const handleClose = React.useCallback(() => {
        dispatch({
            type: SET_CALLBACK_KIOVIET,
        });
        setAddKiotViet(false);
        setCurrent(0);
    }, []);

    return (
        <>
            <TopBar title="Cấu hình" />
            <Container>
                <CardComponent>
                    <Tabs
                        onChange={(key) => setTabIndex(key)}
                        tabBarExtraContent={
                            tabIndex === '1' && (
                                <Button onClick={() => setAddKiotViet(true)} className="gx-mb-2" type="primary">
                                    Thêm mới
                                </Button>
                            )
                        }
                        type="card"
                        items={items}
                    />
                </CardComponent>
            </Container>
            <ModalComponent title="Thêm gian hàng" modalVisible={addKiotViet}>
                <Steps current={current}>
                    <Steps.Step title="Gian hàng" icon={<IconAntd icon="SolutionOutlined" />} />
                    <Steps.Step title="Kho hàng" icon={<IconAntd icon="ShopOutlined" />} />
                </Steps>
                <div className="gx-mt-4">
                    <SynckiotForm
                        handleClose={handleClose}
                        handleBackStep={handleBackStep}
                        handleNextStep={handleNextStep}
                        step={current}
                    />
                </div>
            </ModalComponent>
        </>
    );
};

export default SettingPage;
