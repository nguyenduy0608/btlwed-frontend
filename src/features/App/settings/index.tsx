import CardComponent from '@/components/CardComponent';
import IconAntd from '@/components/IconAntd';
import ModalComponent from '@/components/ModalComponent';
import TopBar from '@/components/TopBar';
import { SET_CALLBACK_KIOVIET } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import Container from '@/layout/Container';
import { Button, Steps, Tabs } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import InformationTab from './components/Information.Tab';
import SynckiotForm from './components/Synckiot.Form';
import SynckiotTab from './components/Synckiot.Tab';
import Warehouse from './components/Warehouse';
import WarehouseFormPage from './components/WarehouseForm';
import { WarehouseService } from './service';

const SettingPage = () => {
    const { state, dispatch } = useCallContext();

    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    if (search) {
        var params = search.substring(1);
        var searchParams = JSON.parse(
            '{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function (key, value) {
                return key === '' ? value : decodeURIComponent(value);
            }
        );
    }

    const [tabIndex, setTabIndex] = React.useState('0');
    const [addKiotViet, setAddKiotViet] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
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

    const items = [
        { label: 'Thông tin hệ thống', key: '0', children: <InformationTab /> }, // remember to pass the key prop
        { label: 'Đồng bộ Kiot Việt', key: '1', children: <SynckiotTab /> },
        {
            label: 'Kho hàng tự động',
            key: '2',
            children: <Warehouse modalVisible={modalVisible} setModalVisible={setModalVisible} />,
        },
    ];

    React.useEffect(() => {
        if (!searchParams?.tab) return;

        setTabIndex(searchParams?.tab);
    }, [searchParams?.tab]);

    return (
        <>
            <TopBar title="Cấu hình" />
            <Container>
                <CardComponent>
                    <Tabs
                        activeKey={tabIndex}
                        onChange={(key) => {
                            navigate(`${pathname}?tab=${key}`);
                            setTabIndex(key);
                        }}
                        tabBarExtraContent={
                            (tabIndex === '1' && (
                                <Button onClick={() => setAddKiotViet(true)} className="gx-mb-2" type="primary">
                                    Thêm mới
                                </Button>
                            )) ||
                            (tabIndex === '2' && (
                                <Button
                                    onClick={() => {
                                        setModalVisible(true);
                                    }}
                                    className="gx-mb-2"
                                    type="primary"
                                >
                                    Thêm mới
                                </Button>
                            ))
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
