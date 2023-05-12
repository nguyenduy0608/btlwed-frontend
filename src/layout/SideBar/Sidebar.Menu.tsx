import IconAntd from '@/components/IconAntd';

export const itemsAdmin: any = [
    {
        label: 'Tổng quan',
        key: '/',
        icon: <IconAntd icon="DashboardOutlined" />,
    },

    {
        label: 'Nhân viên',
        key: 'employee',
        icon: <IconAntd icon="TeamOutlined" />,
    },
    {
        label: 'Hợp đồng',
        key: 'contant',
        icon: <IconAntd icon="SwitcherOutlined" />,
    },
    {
        label: 'Phòng ban',
        key: 'voucher',
        icon: <IconAntd icon="BarcodeOutlined" />,
    },

    {
        label: 'Tài khoản',
        key: 'account',
        icon: <IconAntd icon="UserOutlined" />,
    },
];

export const itemAccountants = [
    {
        label: 'Thông tin điểm danh',
        key: 'calendar',
        icon: <IconAntd icon="UserOutlined" />,
    },
];

export const itemsNews = [
    {
        label: 'Thông báo',
        key: 'notification',
        icon: <IconAntd icon="NotificationOutlined" />,
    },

    {
        label: 'Tin tức',
        key: 'news',
        icon: <IconAntd icon="ProfileOutlined" />,
    },
];
