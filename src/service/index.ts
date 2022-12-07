import AxiosClient from '@/apis/AxiosClient';

export const appService = {
    getKiotviet: async () => {
        return AxiosClient.get('/admin/kiotviet');
    },
    getCountNoti: async () => {
        return AxiosClient.get('/notification/count-noti');
    },
};

export const selectAll = {
    label: 'Tất cả',
    value: '',
};
