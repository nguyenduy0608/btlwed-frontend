import IconAntd from '@/components/IconAntd';

export const items: any = [
    {
        label: 'Tổng quan',
        key: '/',
        icon: <IconAntd icon="DashboardOutlined" />,
    },
    {
        label: 'Sản phẩm',
        key: '/product',
        icon: <IconAntd icon="MergeCellsOutlined" />,
        children: [
            {
                label: 'Danh mục',
                key: 'product/category',
                icon: <IconAntd icon="InboxOutlined" />,
            },
            {
                label: 'Sản phẩm',
                key: 'product',
                icon: <IconAntd icon="ScheduleOutlined" />,
            },
        ],
    },
    {
        label: 'Khách hàng',
        key: 'customer',
        icon: <IconAntd icon="TeamOutlined" />,
    },
    {
        label: 'Đơn hàng',
        key: 'order',
        icon: <IconAntd icon="SwitcherOutlined" />,
    },
    // {
    //     label: 'Hàng hoá',
    //     key: 'merchandise',
    //     icon: <IconAntd icon="MergeCellsOutlined" />,
    //     children: [
    //         {
    //             label: 'Nhập hàng',
    //             key: 'merchandise/importCommodity',
    //             icon: <IconAntd icon="ShoppingOutlined" />,
    //         },
    //         {
    //             label: 'Trả hàng',
    //             key: 'merchandise/returnCommodity',
    //             icon: <IconAntd icon="RollbackOutlined" />,
    //         },
    //         {
    //             label: 'Chuyển hàng',
    //             key: 'merchandise/shipping',
    //             icon: <IconAntd icon="CarOutlined" />,
    //         },
    //     ],
    // },
    {
        label: 'Mã giảm giá',
        key: 'voucher',
        icon: <IconAntd icon="BarcodeOutlined" />,
    },

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
    // {
    //     label: 'Đối tác',
    //     key: 'partner',
    //     icon: <IconAntd icon="ApartmentOutlined" />,
    //     children: [
    //         {
    //             label: 'Khách hàng',
    //             key: 'partner/customer',
    //             icon: <IconAntd icon="UserOutlined" />,
    //         },
    //     ],
    // },
    {
        label: 'Báo cáo',
        key: 'report',
        icon: <IconAntd icon="BarChartOutlined" />,
        children: [
            {
                label: 'Bán hàng',
                key: 'report/sell',
                icon: <IconAntd icon="UserSwitchOutlined" />,
            },
            {
                label: 'Gian hàng',
                key: 'report/stall',
                icon: <IconAntd icon="MergeCellsOutlined" />,
            },
        ],
    },
    {
        label: 'Tài khoản',
        key: 'account',
        icon: <IconAntd icon="UserOutlined" />,
    },
    {
        label: 'Cấu hình',
        key: 'setting',
        icon: <IconAntd icon="SettingOutlined" />,
    },
];
